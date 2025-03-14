/**
 * $Id: mxCompactTreeLayout.js,v 1.36 2008/09/17 11:23:28 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxCompactTreeLayout
 * 
 * Extends <mxGraphLayout> to implement a compact tree (Moen) algorithm. This
 * layout is suitable for graphs that have no cycles (trees). Vertices that are
 * not connected to the tree will be ignored by this layout.
 * 
 * Example:
 * 
 * (code)
 * var layout = new mxCompactTreeLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 */
{

	/**
	 * Constructor: mxCompactTreeLayout
	 * 
	 * Constructs a new compact tree layout for the specified graph
	 * and orientation.
	 */
	function mxCompactTreeLayout(graph, horizontal, invert)
	{
		mxGraphLayout.call(this, graph);
		this.horizontal = (horizontal != null) ? horizontal : true;
		this.invert = (invert != null) ? invert : false;
	};
	
	/**
	 * Extends mxGraphLayout.
	 */
	mxCompactTreeLayout.prototype = new mxGraphLayout();
	mxCompactTreeLayout.prototype.constructor = mxCompactTreeLayout;
	
	/**
	 * Variable: horizontal
	 *
	 * Specifies the orientation of the layout. Default is true.
	 */
	mxCompactTreeLayout.prototype.horizontal = null;	 
	
	/**
	 * Variable: invert
	 *
	 * Specifies if edge directions should be inverted. Default is false.
	 */
	mxCompactTreeLayout.prototype.invert = null;	 
	
	/**
	 * Variable: resizeParent
	 * 
	 * If the parent should be resized to match the width/height of the
	 * tree. Default is true.
	 */
	mxCompactTreeLayout.prototype.resizeParent = true;
			
	/**
	 * Variable: moveTree
	 * 
	 * Specifies if the tree should be moved to the top, left corner
	 * if it is inside a top-level layer. Default is true.
	 */
	mxCompactTreeLayout.prototype.moveTree = true;
	
	/**
	 * Variable: levelDistance
	 *
	 * Holds the levelDistance. Default is 10.
	 */
	mxCompactTreeLayout.prototype.levelDistance = 10;

	/**
	 * Variable: nodeDistance
	 *
	 * Holds the nodeDistance. Default is 20.
	 */
	mxCompactTreeLayout.prototype.nodeDistance = 20;
	
	/**
	 * Variable: resetEdges
	 * 
	 * Specifies if all edge points of traversed edges should be removed.
	 * Default is true.
	 */
	mxCompactTreeLayout.prototype.resetEdges = true;
	
	/**
	 * Function: isVertexIgnored
	 * 
	 * Returns a boolean indicating if the given <mxCell> should be ignored as a
	 * vertex. This returns true if the cell has no connections.
	 * 
	 * Parameters:
	 * 
	 * vertex - <mxCell> whose ignored state should be returned.
	 */
	mxCompactTreeLayout.prototype.isVertexIgnored = function(vertex)
	{
		return mxGraphLayout.prototype.isVertexIgnored.apply(this, arguments) ||
			this.graph.getConnections(vertex).length == 0;
	};
	
	/**
	 * Function: execute
	 * 
	 * Implements <mxGraphLayout.execute>.
	 * 
	 * If the parent has any connected edges, then it is used as the root of
	 * the tree. Else, <mxGraph.findTreeRoots> will be used to find a suitable
	 * root node within the set of children of the given parent.
	 * 
	 * Parameters:
	 * 
	 * parent - <mxCell> whose children should be layed out.
	 * root - Optional <mxCell> that will be used as the root of the tree.
	 */
	mxCompactTreeLayout.prototype.execute = function(parent, root)
	{
		var model = this.graph.getModel();
		
		if (root == null)
		{
			// Takes the parent as the root if it has outgoing edges
			if (this.graph.getEdges(parent, model.getParent(parent),
				this.invert, !this.invert, false).length > 0)
			{
				root = parent;
			}
			
			// Tries to find a suitable root in the parent's
			// children
			else
			{
				var roots = this.graph.findTreeRoots(parent, true, this.invert);
				
				if (roots.length > 0)
				{
					for (var i = 0; i < roots.length; i++)
					{
						if (!this.isVertexIgnored(roots[i]) &&
							this.graph.getEdges(roots[i], null,
								this.invert, !this.invert, false).length > 0)
						{
							root = roots[i];
							break;
						}
					}
				}
			}
		}
		
		if (root != null)
		{
			parent = model.getParent(root);
			model.beginUpdate();
			
			try
			{
				var node = this.dfs(root, parent);
				
				if (node != null)
				{
					this.layout(node);
					var x0 = this.graph.gridSize;
					var y0 = x0;
					
					if (!this.moveTree ||
						model.isLayer(parent))
					{
						var g = model.getGeometry(root);
						
						if (g != null)
						{
							x0 = g.x;
							y0 = g.y;
						}
					}
					
					var bounds = null;
					
					if (this.horizontal)
					{
						bounds = this.horizontalLayout(node, x0, y0);
					}
					else
					{
						bounds = this.verticalLayout(node, null, x0, y0);
					}

					if (bounds != null)
					{
						var dx = 0;
						var dy = 0;

						if (bounds.x < 0)
						{
							dx = Math.abs(x0 - bounds.x);
						}

						if (bounds.y < 0)
						{
							dy = Math.abs(y0 - bounds.y);	
						}

						if (parent != null)
						{
							var size = this.graph.getStartSize(parent);
							dx += size.width;
							dy += size.height;
		
							// Resize parent swimlane
							if (this.resizeParent &&
								!this.graph.isCellCollapsed(parent))
							{
								var g = model.getGeometry(parent);
								
								if (g != null)
								{
									var width = bounds.width + size.width - bounds.x + 2 * x0;
									var height = bounds.height + size.height - bounds.y + 2 * y0;

									g = g.clone();
			
									if (g.width > width)
									{
										dx += (g.width - width) / 2;
									}
									else
									{
										g.width = width;
									}
									
									if (g.height > height)
									{
										if (this.horizontal)
										{
											dy += (g.height - height) / 2;
										}
									}
									else
									{
										g.height = height;
									}
									
									model.setGeometry(parent, g);
								}
							}
						}

						this.moveNode(node, dx, dy);
					}
				}
			}
			finally
			{
				model.endUpdate();
			}
		}
	};

	/**
	 * Function: moveNode
	 * 
	 * Moves the specified node and all of its children by the given amount.
	 */
	mxCompactTreeLayout.prototype.moveNode = function(node, dx, dy)
	{
		node.x += dx;
		node.y += dy;
		this.apply(node);
		
		var child = node.child;
		
		while (child != null)
		{
			this.moveNode(child, dx, dy);
			child = child.next;
		}
	};
	
	/**
	 * Function: dfs
	 * 
	 * Does a depth first search starting at the specified cell.
	 * Makes sure the specified swimlane is never left by the
	 * algorithm.
	 */
	mxCompactTreeLayout.prototype.dfs = function(cell, parent, visited)
	{
		visited = visited || new Array();
		
		var id = mxCellPath.create(cell);
		var node = null;
		
		if (cell != null &&
			visited[id] == null &&
			!this.isVertexIgnored(cell))
		{
			visited[id] = cell;
			node = this.createNode(cell);

			var model = this.graph.getModel();
			var prev = null;
			var out = this.graph.getEdges(cell, parent, this.invert, !this.invert, false);
		
			for (var i = 0; i < out.length; i++)
			{
				var edge = out[i];
				
				if (!this.isEdgeIgnored(edge))
				{
					// Resets the points on the traversed edge
					if (this.resetEdges)
					{
						this.setEdgePoints(edge, null);
					}
					
					// Checks if terminal in same swimlane
					var target = this.graph.getView().getVisibleTerminal(edge, this.invert);
					var tmp = this.dfs(target, parent, visited);
					
					if (tmp != null &&
						model.getGeometry(target) != null)
					{
						if (prev == null)
						{
							node.child = tmp;
						}
						else
						{
							prev.next = tmp;
						}
						
						prev = tmp;
					}
				}
			}
		}
		
		return node;
	};

	/**
	 * Function: layout
	 * 
	 * Starts the actual compact tree layout algorithm
	 * at the given node.
	 */
	mxCompactTreeLayout.prototype.layout = function(node)
	{
		if (node != null)
		{
			var child = node.child;
			
			while (child != null)
			{
				this.layout(child);
				child = child.next;
			}
			
			if (node.child != null)
			{
				this.attachParent(node, this.join(node));
			}
			else
			{
				this.layoutLeaf(node);
			}
		}
	};

	/**
	 * Function: horizontalLayout
	 */
	mxCompactTreeLayout.prototype.horizontalLayout = function(node, x0, y0, bounds)
	{
		node.x += x0 + node.offsetX;
		node.y += y0 + node.offsetY;
		bounds = this.apply(node, bounds);
		var child = node.child;
		
		if (child != null)
		{
			bounds = this.horizontalLayout(child, node.x, node.y, bounds);
			var siblingOffset = node.y + child.offsetY;
			var s = child.next;
			
			while (s != null)
			{
				bounds = this.horizontalLayout(s, node.x + child.offsetX, siblingOffset, bounds);
				siblingOffset += s.offsetY;
				s = s.next;
			}
		}
		
		return bounds;
	};
		
	/**
	 * Function: verticalLayout
	 */
	mxCompactTreeLayout.prototype.verticalLayout = function(node, parent, x0, y0, bounds)
	{
		node.x += x0 + node.offsetY;
		node.y += y0 + node.offsetX;
		bounds = this.apply(node, bounds);
		var child = node.child;
		
		if (child != null)
		{
			bounds = this.verticalLayout(child, node, node.x, node.y, bounds);
			var siblingOffset = node.x + child.offsetY;
			var s = child.next;
			
			while (s != null)
			{
				bounds = this.verticalLayout(s, node, siblingOffset, node.y + child.offsetX, bounds);
				siblingOffset += s.offsetY;
				s = s.next;
			}
		}
		
		return bounds;
	};

	/**
	 * Function: attachParent
	 */
	mxCompactTreeLayout.prototype.attachParent = function(node, height)
	{
		var x = this.nodeDistance + this.levelDistance;
		var y2 = (height - node.width) / 2 - this.nodeDistance;
		var y1 = y2 + node.width + 2 * this.nodeDistance - height;
		
		node.child.offsetX = x + node.height;
		node.child.offsetY = y1;
		
		node.contour.upperHead = this.createLine(node.height, 0,
			this.createLine(x, y1, node.contour.upperHead));
		node.contour.lowerHead = this.createLine(node.height, 0,
			this.createLine(x, y2, node.contour.lowerHead));
	};

	/**
	 * Function: layoutLeaf
	 */
	mxCompactTreeLayout.prototype.layoutLeaf = function(node)
	{
		var dist = 2 * this.nodeDistance;
		
		node.contour.upperTail = this.createLine(
			node.height + dist, 0);
		node.contour.upperHead = node.contour.upperTail;
		node.contour.lowerTail = this.createLine(
			0, -node.width - dist);
		node.contour.lowerHead = this.createLine(
			node.height + dist, 0, node.contour.lowerTail);
	};

	/**
	 * Function: join
	 */
	mxCompactTreeLayout.prototype.join = function(node)
	{
		var dist = 2 * this.nodeDistance;
		
		var child = node.child;
		node.contour = child.contour;
		var h = child.width + dist;
		var sum = h;
		child = child.next;
		
		while (child != null)
		{
			var d = this.merge(node.contour, child.contour);
			child.offsetY = d + h;
			child.offsetX = 0;
			h = child.width + dist;
			sum += d + h;
			child = child.next;
		}
		
		return sum;
	};

	/**
	 * Function: merge
	 */
	mxCompactTreeLayout.prototype.merge = function(p1, p2)
	{
		var x = 0;
		var y = 0;
		var total = 0;
		
		var upper = p1.lowerHead;
		var lower = p2.upperHead;
		
		while (lower != null && upper != null)
		{
			var d = this.offset(x, y, lower.dx, lower.dy,
				upper.dx, upper.dy);
			y += d;
			total += d;
			
			if (x + lower.dx <= upper.dx)
			{
				x += lower.dx;
				y += lower.dy;
				lower = lower.next;
			}
			else
			{				
				x -= upper.dx;
				y -= upper.dy;
				upper = upper.next;
			}
		}
		
		if (lower != null)
		{
			var b = this.bridge(p1.upperTail, 0, 0, lower, x, y);
			p1.upperTail = (b.next != null) ? p2.upperTail : b;
			p1.lowerTail = p2.lowerTail;
		}
		else
		{
			var b = this.bridge(p2.lowerTail, x, y, upper, 0, 0);
			
			if (b.next == null)
			{
				p1.lowerTail = b;
			}
		}
		
		p1.lowerHead = p2.lowerHead;
		
		return total;
	};

	/**
	 * Function: offset
	 */
	mxCompactTreeLayout.prototype.offset = function(p1, p2, a1, a2, b1, b2)
	{
		var d = 0;
		
		if (b1 <= p1 || p1 + a1 <= 0)
		{
			return 0;
		}

		var t = b1 * a2 - a1 * b2;
		
		if (t > 0)
		{
			if (p1 < 0)
			{
				var s = p1 * a2;
				d = s / a1 - p2;
			}
			else if (p1 > 0)
			{
				var s = p1 * b2;
				d = s / b1 - p2;
			}
			else
			{
				d = -p2;
			}
		}
		else if (b1 < p1 + a1)
		{
			var s = (b1 - p1) * a2;
			d = b2 - (p2 + s / a1);
		}
		else if (b1 > p1 + a1)
		{
			var s = (a1 + p1) * b2;
			d = s / b1 - (p2 + a2);
		}
		else
		{
			d = b2 - (p2 + a2);
		}

		if (d > 0)
		{
			return d;
		}
		else
		{
			return 0;
		}
	};

	/**
	 * Function: bridge
	 */
	mxCompactTreeLayout.prototype.bridge = function(line1, x1, y1, line2, x2, y2)
	{
		var dx = x2 + line2.dx - x1;
		var dy = 0;
		var s = 0;
		
		if (line2.dx == 0)
		{
			dy = line2.dy;
		}
		else
		{
			var s = dx * line2.dy;
			dy = s / line2.dx;
		}
		
		var r = this.createLine(dx, dy, line2.next);
		line1.next = this.createLine(0, y2 + line2.dy - dy - y1, r);
		
		return r;
	};

	/**
	 * Function: createNode
	 */
	mxCompactTreeLayout.prototype.createNode = function(cell)
	{
		var node = new Object();
		node.cell = cell;
		node.x = 0;
		node.y = 0;
		node.width = 0;
		node.height = 0;
		
		var geo = this.getVertexBounds(cell);
		
		if (geo != null)
		{
			if (this.horizontal)
			{
				node.width = geo.height;
				node.height = geo.width;			
			}
			else
			{
				node.width = geo.width;
				node.height = geo.height;
			}
		}
		
		node.offsetX = 0;
		node.offsetY = 0;
		node.contour = new Object();
		
		return node;
	};

	/**
	 * Function: apply
	 */
	mxCompactTreeLayout.prototype.apply = function(node, bounds)
	{
		var g = this.graph.getModel().getGeometry(node.cell);
		
		if (node.cell != null && g != null)
		{
			if (this.isVertexMovable(node.cell))
			{
				g = this.setVertexLocation(node.cell, node.x, node.y);
			}
			
			if (bounds == null)
			{
				bounds = new mxRectangle(g.x, g.y, g.width, g.height);
			}
			else
			{
				bounds = new mxRectangle(Math.min(bounds.x, g.x),
					Math.min(bounds.y, g.y),
					Math.max(bounds.x + bounds.width, g.x + g.width),
					Math.max(bounds.y + bounds.height, g.y + g.height));
			}
		}
		
		return bounds;
	};
	
	/**
	 * Function: createLine
	 */
	mxCompactTreeLayout.prototype.createLine = function(dx, dy, next)
	{
		var line = new Object();
		line.dx = dx;
		line.dy = dy;
		line.next = next;
		
		return line;
	};

}
