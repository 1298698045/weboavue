/**
 * $Id: mxGraphHierarchyModel.js,v 1.15 2008/10/08 18:35:02 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxGraphHierarchyModel
 * 
 * Internal model of a hierarchical graph. This model stores nodes and edges
 * equivalent to the real graph nodes and edges, but also stores the rank of the
 * cells, the order within the ranks and the new candidate locations of cells.
 * The internal model also reverses edge direction were appropriate , ignores
 * self-loop and groups parallels together under one edge object.
 */
{

	/**
	 * Constructor: mxGraphHierarchyModel
	 *
	 * Creates an internal ordered graph model using the vertices passed in. If
	 * there are any, leftward edge need to be inverted in the internal model
	 *
	 * Arguments:
	 * 
	 * graph - the facade describing the graph to be operated on
	 * vertices - the vertices for this hierarchy
	 * ordered - whether or not the vertices are already ordered
	 * deterministic - whether or not this layout should be deterministic on each
	 * usage
	 */
	function mxGraphHierarchyModel(layout, vertices, roots, parent, ordered, deterministic)
	{
		var graph = layout.getGraph();
		this.deterministic = deterministic;
		this.roots = roots;
		
		// map of cells to internal cell needed for second run through
		// to setup the sink of edges correctly
		this.vertexMapper = new Object();
		this.edgeMapper = new Object();
		this.maxRank = 0;
		var internalVertices = new Array();

		if (vertices == null)
		{
			vertices = this.graph.getChildVertices(parent);
		}
				
		if (ordered)
		{
			this.formOrderedHierarchy(layout, vertices, parent);
		}
		else
		{
			// map of cells to internal cell needed for second run through
			// to setup the sink of edges correctly. Guess size by number
			// of edges is roughly same as number of vertices.
			this.createInternalCells(layout, vertices, internalVertices);
			
			// Go through edges set their sink values. Also check the
			// ordering if and invert edges if necessary
			for (var i = 0; i < vertices.length; i++)
			{
				var edges = internalVertices[i].connectsAsSource;
				
				for (var j = 0; j < edges.length; j++)
				{
					var internalEdge = edges[j];
					var realEdges = internalEdge.edges;
					
					for (var k = 0; k < realEdges.length; k++)
					{
						var realEdge = realEdges[k];
						var targetCell = graph.getView().getVisibleTerminal(
								realEdge, false);
						var targetCellId = mxCellPath.create(targetCell);
						var internalTargetCell = this.vertexMapper[targetCellId];
						
						if (internalTargetCell != null
								&& internalVertices[i] != internalTargetCell)
						{
							internalEdge.target = internalTargetCell;
							
							if (internalTargetCell.connectsAsTarget.length == 0)
							{
								internalTargetCell.connectsAsTarget = new Array();
							}

							if (mxUtils.indexOf(internalTargetCell.connectsAsTarget, internalEdge) < 0)
							{
								internalTargetCell.connectsAsTarget.push(internalEdge);
							}
						}
					}
				}
				
				// Use the temp variable in the internal nodes to mark this
				// internal vertex as having been visited.
				internalVertices[i].temp[0] = 1;
			}
		}
	};

	/**
	 * Variable: sinksAtLayerZero
	 * 
	 * Whether or not layer 0 contains a sink or a source. Default is true.
	 */
	mxGraphHierarchyModel.prototype.sinksAtLayerZero = true;

	/**
	 * Variable: maxRank
	 * 
	 * Stores the largest rank number allocated
	 */
	mxGraphHierarchyModel.prototype.maxRank = null;

	/**
	 * Variable: vertexMapper
	 * 
	 * Map from graph vertices to internal model nodes.
	 */
	mxGraphHierarchyModel.prototype.vertexMapper = null;

	/**
	 * Variable: edgeMapper
	 * 
	 * Map from graph edges to internal model edges
	 */
	mxGraphHierarchyModel.prototype.edgeMapper = null;

	/**
	 * Variable: ranks
	 * 
	 * Mapping from rank number to actual rank
	 */
	mxGraphHierarchyModel.prototype.ranks = null;

	/**
	 * Variable: roots
	 * 
	 * Store of roots of this hierarchy model, these are real graph cells, not
	 * internal cells
	 */
	mxGraphHierarchyModel.prototype.roots = null;

	/**
	 * Variable: parent
	 * 
	 * The parent cell whose children are being laid out
	 */
	mxGraphHierarchyModel.prototype.parent = null;

	/**
	 * Variable: dfsCount
	 * 
	 * Count of the number of times the ancestor dfs has been used.
	 */
	mxGraphHierarchyModel.prototype.dfsCount = 0;

	/**
	 * Variable: deterministic
	 * 
	 * Whether or not cells are ordered according to the order in the graph
	 * model. Defaults to false since sorting usually produces quadratic
	 * performance. Note that since mxGraph returns edges in a deterministic
	 * order, it might be that this layout is always deterministic using that
	 * JGraph regardless of this flag setting (i.e. leave it false in that
	 * case). Default is true.
	 */
	mxGraphHierarchyModel.prototype.deterministic;

	/**
	 * Function: formOrderedHierarchy
	 * 
	 * Creates an internal ordered graph model using the vertices passed in. If
	 * there are any, leftward edge need to be inverted in the internal model
	 * 
	 * Parameters:
	 * 
	 * layout - Reference to the <mxHierarchicalLayout> algorithm.
	 * vertices - Array of <mxCells> that represent the vertices to be laid
	 * out.
	 */
	mxGraphHierarchyModel.prototype.formOrderedHierarchy = function(layout, vertices, parent)
	{
		var graph = layout.getGraph();
		this.createInternalCells(layout, vertices, internalVertices);
		
		// Go through edges set their sink values. Also check the
		// ordering if and invert edges if necessary
		// Need a temporary list to store which of these edges have been
		// inverted in the internal model. If connectsAsSource were changed
		// in the following while loop we'd get a
		// ConcurrentModificationException
		var tempList = new Array();
		
		for (var i = 0; i < vertices.length; i++)
		{
			var edges = internalVertices[i].connectsAsSource;
			
			for (var j = 0; j < edges.length; j++)
			{
				var internalEdge = edges[j];
				var realEdges = internalEdge.edges;
				
				for (var k = 0; k < realEdges.length; k++)
				{
					var realEdge = realEdges[k];
					var targetCell = this.graph.getView().getVisibleTerminal(realEdge, false);
					var targetCellId = mxCellPath.create(targetCell);
					var internalTargetCell = vertexMapper[targetCellId];
					
					if (internalTargetCell != null
							&& internalVertices[i] != internalTargetCell)
					{
						internalEdge.target = internalTargetCell;
						
						if (internalTargetCell.connectsAsTarget.length == 0)
						{
							internalTargetCell.connectsAsTarget = new Array();
						}

						// The vertices passed in were ordered, check that the
						// target cell has not already been marked as visited
						if (internalTargetCell.temp[0] == 1)
						{
							// Internal Edge is leftward, reverse it
							internalEdge.invert();
							// There must be a connectsAsSource list already
							internalTargetCell.connectsAsSource
									.push(internalEdge);
							tempList.push(internalEdge);
							if (mxUtils.indexOf(internalVertices[i].connectsAsTarget, internalEdge) < 0)
							{
								internalVertices[i].connectsAsTarget
										.push(internalEdge);
							}
						}
						else
						{
							if (mxUtils.indexOf(internalTargetCell.connectsAsTarget, internalEdge) < 0)
							{
								internalTargetCell.connectsAsTarget
										.push(internalEdge);
							}
						}
					}
				}
			}
			
			// Remove the inverted edges as sources from this node
			for (var j = 0; j < tempList.length; j++)
			{
				var tmp = tempList[j];
				mxUtils.remove(tmp, internalVertices[i].connectsAsSource);
			}
			
			tempList = new Array();

			// Use the temp variable in the internal nodes to mark this
			// internal vertex as having been visited.
			internalVertices[i].temp[0] = 1;
		}
	};

	/**
	 * Function: createInternalCells
	 * 
	 * Creates all edges in the internal model
	 * 
	 * Parameters:
	 * 
	 * layout - Reference to the <mxHierarchicalLayout> algorithm.
	 * vertices - Array of <mxCells> that represent the vertices whom are to
	 * have an internal representation created.
	 * internalVertices - The array of <mxGraphHierarchyNodes> to have their
	 * information filled in using the real vertices.
	 */
	mxGraphHierarchyModel.prototype.createInternalCells = function(layout, vertices, internalVertices)
	{
		var graph = layout.getGraph();

		// Create internal edges
		for (var i = 0; i < vertices.length; i++)
		{
			internalVertices[i] = new mxGraphHierarchyNode(vertices[i]);
			var vertexId = mxCellPath.create(vertices[i]);
			this.vertexMapper[vertexId] = internalVertices[i];

			// If the layout is deterministic, order the cells
			//List outgoingCells = graph.getNeighbours(vertices[i], deterministic);
			var conns = graph.getConnections(vertices[i], this.parent);
			var outgoingCells = graph.getOpposites(conns, vertices[i]);
			internalVertices[i].connectsAsSource = new Array();
			
			// Create internal edges, but don't do any rank assignment yet
			// First use the information from the greedy cycle remover to
			// invert the leftward edges internally
			for (var j = 0; j < outgoingCells.length; j++)
			{
				var cell = outgoingCells[j];
				
				if (cell != vertices[i] && !layout.isVertexIgnored(cell))
				{
					// Allow for parallel edges
					// TODO: Use the fact that we already know the source and
					// target to collect parallel edges faster.
					var edges = graph.getEdgesBetween(vertices[i], cell, true);
					
					if (edges != null && edges.length > 0)
					{
						var internalEdge = new mxGraphHierarchyEdge(edges);
						
						for (var k = 0; k < edges.length; k++)
						{
							var edge = edges[k];
							var edgeId = mxCellPath.create(edge);
							this.edgeMapper[edgeId] = internalEdge;
						}
						
						internalEdge.source = internalVertices[i];
						if (mxUtils.indexOf(internalVertices[i].connectsAsSource, internalEdge) < 0)
						{
							internalVertices[i].connectsAsSource.push(internalEdge);
						}
					}
				}
			}
			
			// Ensure temp variable is cleared from any previous use
			internalVertices[i].temp[0] = 0;
		}
	};

	/**
	 * Function: initialRank
	 * 
	 * Basic determination of minimum layer ranking by working from from sources
	 * or sinks and working through each node in the relevant edge direction.
	 * Starting at the sinks is basically a longest path layering algorithm.
	 * 
	 * Parameters:
	 * 
	 * startAtSinks - Whether or not layer 0 will be assigned to a sink node.
	 */
	mxGraphHierarchyModel.prototype.initialRank = function(startAtSinks)
	{
		sinksAtLayerZero = startAtSinks;
		var startNodes = null;
		
		if (!startAtSinks && this.roots != null)
		{
			startNodes = this.roots.slice();
		}
		else
		{
			startNodes = new Array();
		}
		
		if (startAtSinks)
		{
			for (var key in this.vertexMapper)
			{
				var internalNode = this.vertexMapper[key];
				
				if (internalNode.connectsAsSource == null ||
					internalNode.connectsAsSource.length == 0)
				{
					startNodes.push(internalNode);
				}
				
				// Mark the node as not having had a layer assigned
				internalNode.temp[0] = -1;
			}
			
			// if we couldn't find any sinks, try to do it from the sources
			if (startNodes.length == 0)
			{
				startAtSinks = false;
			}
		}
		
		var startNodesCopy = startNodes.slice();

		while (startNodes.length > 0)
		{
			var internalNode = startNodes[0];
			var layerDeterminingEdges;
			var edgesToBeMarked;
			
			if (startAtSinks)
			{
				layerDeterminingEdges = internalNode.connectsAsSource;
				edgesToBeMarked = internalNode.connectsAsTarget;
			}
			else
			{
				layerDeterminingEdges = internalNode.connectsAsTarget;
				edgesToBeMarked = internalNode.connectsAsSource;
			}

			// flag to keep track of whether or not all layer determining
			// edges have been scanned
			var allEdgesScanned = true;
			
			// Work out the layer of this node from the layer determining
			// edges. The minimum layer number of any node connected by one of
			// the layer determining edges variable
			var minimumLayer = 0;
			
			for (var i = 0; i < layerDeterminingEdges.length; i++)
			{
				var internalEdge = layerDeterminingEdges[i];

				if (internalEdge.temp[0] == 5270620)
				{
					// This edge has been scanned, get the layer of the
					// node on the other end
					var otherNode;
					
					if (startAtSinks)
					{
						otherNode = internalEdge.target;
					}
					else
					{
						otherNode = internalEdge.source;
					}
					
					minimumLayer = Math
							.max(minimumLayer, otherNode.temp[0] + 1);
				}
				else
				{
					allEdgesScanned = false;
					
					break;
				}
			}
			
			// If all edge have been scanned, assign the layer, mark all
			// edges in the other direction and remove from the nodes list
			if (allEdgesScanned)
			{
				internalNode.temp[0] = minimumLayer;
				this.maxRank = Math.max(this.maxRank, minimumLayer);
				
				if (edgesToBeMarked != null)
				{
					for (var i = 0; i < edgesToBeMarked.length; i++)
					{
						var internalEdge = edgesToBeMarked[i];

						// Assign unique stamp ( y/m/d/h )
						internalEdge.temp[0] = 5270620;

						// Add node on other end of edge to LinkedList of
						// nodes to be analysed
						var otherNode;
						
						if (startAtSinks)
						{
							otherNode = internalEdge.source;
						}
						else
						{
							otherNode = internalEdge.target;
						}
						
						// Only add node if it hasn't been assigned a layer
						if (otherNode.temp[0] == -1)
						{
							startNodes.push(otherNode);

							// Mark this other node as neither being
							// unassigned nor assigned so it isn't
							// added to this list again, but it's
							// layer isn't used in any calculation.
							otherNode.temp[0] = -2;
						}
					}
				}
				
				startNodes.shift();
			}
			else
			{
				// Not all the edges have been scanned, get to the back of
				// the class and put the dunces cap on
				var removedCell = startNodes.shift();
				startNodes.push(internalNode);
				
				if (removedCell == internalNode && startNodes.length == 1)
				{
					// This is an error condition, we can't get out of
					// this loop. It could happen for more than one node
					// but that's a lot harder to detect. Log the error
					// TODO make log comment
					break;
				}
			}
		}

		sinksAtLayerZero = startAtSinks;

		if (startAtSinks)
		{
			// Tighten the rank 0 nodes as far as possible
			for (var i = 0; i < startNodesCopy.length; i++)
			{
				var internalNode = startNodesCopy[i];
				var currentMinLayer = 1000000;
				var layerDeterminingEdges = internalNode.connectsAsTarget;
				
				for (var j = 0; j < internalNode.connectsAsTarget.length; j++)
				{
					var internalEdge = internalNode.connectsAsTarget[j];
					var otherNode = internalEdge.source;
					internalNode.temp[0] = Math.min(currentMinLayer,
							otherNode.temp[0] - 1);
					currentMinLayer = internalNode.temp[0];
				}
			}
		}
	};

	/**
	 * Function: fixRanks
	 * 
	 * Fixes the layer assignments to the values stored in the nodes. Also needs
	 * to create dummy nodes for edges that cross layers.
	 */
	mxGraphHierarchyModel.prototype.fixRanks = function()
	{
		var rankList = new Array();
		this.ranks = new Array();
		
		for (var i = 0; i < this.maxRank + 1; i++)
		{
			rankList[i] = new Array();
			this.ranks[i] = rankList[i];
		}
		
		// Perform a DFS to obtain an initial ordering for each rank.
		// Without doing this you would end up having to process
		// crossings for a standard tree.
		var rootsArray = null;
		
		if (this.roots != null)
		{
			var oldRootsArray = this.roots;
			rootsArray = new Array();
			
			for (var i = 0; i < oldRootsArray.length; i++)
			{
				var cell = oldRootsArray[i];
				var cellId = mxCellPath.create(cell);
				var internalNode = this.vertexMapper[cellId];
				rootsArray[i] = internalNode;
			}
		}

		this.visit(function(parent, node, edge, layer, seen)
		{
			if (seen == 0 && node.maxRank < 0 && node.minRank < 0)
			{
				rankList[node.temp[0]].push(node);
				node.maxRank = node.temp[0];
				node.minRank = node.temp[0];
				
				// Set temp[0] to the nodes position in the rank
				node.temp[0] = rankList[node.maxRank].length - 1;
			}
			
			if (parent != null && edge != null)
			{
				var parentToCellRankDifference = parent.maxRank - node.maxRank;
				
				if (parentToCellRankDifference > 1)
				{
					// There are ranks in between the parent and current cell
					edge.maxRank = parent.maxRank;
					edge.minRank = node.maxRank;
					edge.temp = new Array();
					edge.x = new Array();
					edge.y = new Array();
					
					for (var i = edge.minRank + 1; i < edge.maxRank; i++)
					{
						// The connecting edge must be added to the
						// appropriate ranks
						rankList[i].push(edge);
						edge.setGeneralPurposeVariable(i, rankList[i]
								.length - 1);
					}
				}
			}
		}, rootsArray, false, null);
	};

	/**
	 * Function: visit
	 * 
	 * A depth first search through the internal heirarchy model.
	 * 
	 * Parameters:
	 * 
	 * visitor - The visitor function pattern to be called for each node.
	 * trackAncestors - Whether or not the search is to keep track all nodes
	 * directly above this one in the search path.
	 */
	mxGraphHierarchyModel.prototype.visit = function(visitor, dfsRoots, trackAncestors, seenNodes)
	{
		// Run dfs through on all roots
		if (dfsRoots != null)
		{
			for (var i = 0; i < dfsRoots.length; i++)
			{
				var internalNode = dfsRoots[i];

				if (internalNode != null)
				{
					if (seenNodes == null)
					{
						seenNodes = new Object();
					}
					
					if (trackAncestors)
					{
						// Set up hash code for root
						internalNode.hashCode = new Array();
						internalNode.hashCode[0] = this.dfsCount;
						internalNode.hashCode[1] = i;
						this.extendedDfs(null, internalNode, null, visitor, seenNodes,
								internalNode.hashCode, i, 0);
					}
					else
					{
						this.dfs(null, internalNode, null, visitor, seenNodes, 0);
					}
				}
			}
			
			this.dfsCount++;
		}
	};

	/**
	 * Function: dfs
	 * 
	 * Performs a depth first search on the internal hierarchy model
	 * 
	 * Parameters:
	 * 
	 * parent - the parent internal node of the current internal node
	 * root - the current internal node
	 * connectingEdge - the internal edge connecting the internal node and the parent
	 * internal node, if any
	 * visitor - the visitor pattern to be called for each node
	 * seen - a set of all nodes seen by this dfs a set of all of the
	 * ancestor node of the current node
	 * layer - the layer on the dfs tree ( not the same as the model ranks )
	 */
	mxGraphHierarchyModel.prototype.dfs = function(parent, root, connectingEdge, visitor, seen, layer)
	{
		if (root != null)
		{
			var rootId = mxCellPath.create(root.cell);
			
			if (seen[rootId] == null)
			{
				seen[rootId] = root;
				visitor(parent, root, connectingEdge, layer, 0);
				
				// Copy the connects as source list so that visitors
				// can change the original for edge direction inversions
				for (var i = 0; i< root.connectsAsSource.length; i++)
				{
					var internalEdge = root.connectsAsSource[i];
					var targetNode = internalEdge.target;

					// Root check is O(|roots|)
					this.dfs(root, targetNode, internalEdge, visitor, seen,
							layer + 1);
				}
			}
			else
			{
				// Use the int field to indicate this node has been seen
				visitor(parent, root, connectingEdge, layer, 1);
			}
		}
	};

	/**
	 * Function: extendedDfs
	 * 
	 * Performs a depth first search on the internal hierarchy model. This dfs
	 * extends the default version by keeping track of cells ancestors, but it
	 * should be only used when necessary because of it can be computationally
	 * intensive for deep searches.
	 * 
	 * Parameters:
	 * 
	 * parent - the parent internal node of the current internal node
	 * root - the current internal node
	 * connectingEdge - the internal edge connecting the internal node and the parent
	 * internal node, if any
	 * visitor - the visitor pattern to be called for each node
	 * seen - a set of all nodes seen by this dfs
	 * ancestors - the parent hash code
	 * childHash - the new hash code for this node
	 * layer - the layer on the dfs tree ( not the same as the model ranks )
	 */
	mxGraphHierarchyModel.prototype.extendedDfs = function(parent, root, connectingEdge, visitor, seen, ancestors, childHash, layer)
	{
		// Explanation of custom hash set. Previously, the ancestors variable
		// was passed through the dfs as a HashSet. The ancestors were copied
		// into a new HashSet and when the new child was processed it was also
		// added to the set. If the current node was in its ancestor list it
		// meant there is a cycle in the graph and this information is passed
		// to the visitor.visit() in the seen parameter. The HashSet clone was
		// very expensive on CPU so a custom hash was developed using primitive
		// types. temp[] couldn't be used so hashCode[] was added to each node.
		// Each new child adds another int to the array, copying the prefix
		// from its parent. Child of the same parent add different ints (the
		// limit is therefore 2^32 children per parent...). If a node has a
		// child with the hashCode already set then the child code is compared
		// to the same portion of the current nodes array. If they match there
		// is a loop.
		// Note that the basic mechanism would only allow for 1 use of this
		// functionality, so the root nodes have two ints. The second int is
		// incremented through each node root and the first is incremented
		// through each run of the dfs algorithm (therefore the dfs is not
		// thread safe). The hash code of each node is set if not already set,
		// or if the first int does not match that of the current run.
		if (root != null)
		{
			if (parent != null)
			{
				// Form this nodes hash code if necessary, that is, if the
				// hashCode variable has not been initialized or if the
				// start of the parent hash code does not equal the start of
				// this nodes hash code, indicating the code was set on a
				// previous run of this dfs.
				if (root.hashCode == null ||
					root.hashCode[0] != parent.hashCode[0])
				{
					var hashCodeLength = parent.hashCode.length + 1;
					root.hashCode = parent.hashCode.slice();
					root.hashCode[hashCodeLength - 1] = childHash;
				}
			}

			var rootId = mxCellPath.create(root.cell);
			
			if (seen[rootId] == null)
			{
				seen[rootId] = root;
				visitor(parent, root, connectingEdge, layer, 0);
				
				// Copy the connects as source list so that visitors
				// can change the original for edge direction inversions
				var outgoingEdges = root.connectsAsSource.slice();
				
				for (var i = 0; i < root.connectsAsSource.length; i++)
				{
					var internalEdge = root.connectsAsSource[i];
					var targetNode = internalEdge.target;
					
					// Root check is O(|roots|)
					this.extendedDfs(root, targetNode, internalEdge, visitor, seen,
							root.hashCode, i, layer + 1);
				}
			}
			else
			{
				// Use the int field to indicate this node has been seen
				visitor(parent, root, connectingEdge, layer, 1);
			}
		}
	};

}
