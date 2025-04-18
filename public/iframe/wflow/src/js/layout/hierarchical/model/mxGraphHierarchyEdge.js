/**
 * $Id: mxGraphHierarchyEdge.js,v 1.7 2008/06/30 13:07:57 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxGraphHierarchyEdge
 * 
 * An abstraction of a hierarchical edge for the hierarchy layout
 */
{

	/**
	 * Constructor: mxGraphHierarchyEdge
	 *
	 * Constructs a hierarchy edge
	 *
	 * Arguments:
	 * 
	 * edges - a list of real graph edges this abstraction represents
	 */
	function mxGraphHierarchyEdge(edges)
	{
		mxGraphAbstractHierarchyCell.apply(this, arguments);
		this.edges = edges;
	};
	
	/**
	 * Extends mxGraphAbstractHierarchyCell.
	 */
	mxGraphHierarchyEdge.prototype = new mxGraphAbstractHierarchyCell();
	mxGraphHierarchyEdge.prototype.constructor = mxGraphHierarchyEdge;

	/**
	 * Variable: edges
	 * 
	 * The graph edge(s) this object represents. Parallel edges are all grouped
	 * together within one hierarchy edge.
	 */
	mxGraphHierarchyEdge.prototype.edges = null;

	/**
	 * Variable: source
	 * 
	 * The node this edge is sourced at
	 */
	mxGraphHierarchyEdge.prototype.source = null;

	/**
	 * Variable: target
	 * 
	 * The node this edge targets
	 */
	mxGraphHierarchyEdge.prototype.target = null;

	/**
	 * Variable: isReversed
	 * 
	 * Whether or not the direction of this edge has been reversed
	 * internally to create a DAG for the hierarchical layout
	 */
	mxGraphHierarchyEdge.prototype.isReversed = false;

	/**
	 * Function: invert
	 * 
	 * Inverts the direction of this internal edge(s)
	 */
	mxGraphHierarchyEdge.prototype.invert = function(layer)
	{
		var temp = this.source;
		this.source = this.target;
		this.target = temp;
		this.isReversed = !this.isReversed;
	};

	/**
	 * Function: getNextLayerConnectedCells
	 * 
	 * Returns the cells this cell connects to on the next layer up
	 */
	mxGraphHierarchyEdge.prototype.getNextLayerConnectedCells = function(layer)
	{
		if (this.nextLayerConnectedCells == null)
		{
			this.nextLayerConnectedCells = new Array();
			
			for (var i = 0; i < this.temp.length; i++)
			{
				this.nextLayerConnectedCells[i] = new Array();
				
				if (i == this.nextLayerConnectedCells.length - 1)
				{
					this.nextLayerConnectedCells[i].push(this.source);
				}
				else
				{
					this.nextLayerConnectedCells[i].push(this);
				}
			}
		}
		
		return this.nextLayerConnectedCells[layer - this.minRank - 1];
	};

	/**
	 * Function: getPreviousLayerConnectedCells
	 * 
	 * Returns the cells this cell connects to on the next layer down
	 */
	mxGraphHierarchyEdge.prototype.getPreviousLayerConnectedCells = function(layer)
	{
		if (this.previousLayerConnectedCells == null)
		{
			this.previousLayerConnectedCells = new Array();

			for (var i = 0; i < this.temp.length; i++)
			{
				this.previousLayerConnectedCells[i] = new Array();
				
				if (i == 0)
				{
					this.previousLayerConnectedCells[i].push(this.target);
				}
				else
				{
					this.previousLayerConnectedCells[i].push(this);
				}
			}
		}

		return this.previousLayerConnectedCells[layer - this.minRank - 1];
	};

	/**
	 * Function: isEdge
	 * 
	 * Returns true.
	 */
	mxGraphHierarchyEdge.prototype.isEdge = function()
	{
		return true;
	};

	/**
	 * Function: getGeneralPurposeVariable
	 * 
	 * Gets the value of temp for the specified layer
	 */
	mxGraphHierarchyEdge.prototype.getGeneralPurposeVariable = function(layer)
	{
		return this.temp[layer - this.minRank - 1];
	};

	/**
	 * Function: setGeneralPurposeVariable
	 * 
	 * Set the value of temp for the specified layer
	 */
	mxGraphHierarchyEdge.prototype.setGeneralPurposeVariable = function(layer, value)
	{
		this.temp[layer - this.minRank - 1] = value;
	};

}
