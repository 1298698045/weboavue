/**
 * $Id: mxCellState.js,v 1.20 2009/01/27 14:25:03 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxCellState
 * 
 * Represents the current state of a cell in a given <mxGraphView>.
 * 
 * For edges, the edge label position is stored in <absoluteOffset>.
 * 
 * The size for oversize labels can be retrieved using the boundingBox property
 * of the <text> field as shown below.
 * 
 * (code)
 * var bbox = (state.text != null) ? state.text.boundingBox : null;
 * (end)
 */
{

	/**
	 * Constructor: mxCellState
	 * 
	 * Constructs a new object that represents the current state of the given
	 * cell in the specified view.
	 * 
	 * Parameters:
	 * 
	 * view - <mxGraphView> that contains the state.
	 * cell - <mxCell> that this state represents.
	 * style - Array of key, value pairs that constitute the style.
	 */
	function mxCellState(view, cell, style)
	{
		this.view = view;
		this.cell = cell;
		this.style = style;
		
		this.origin = new mxPoint();
		this.absoluteOffset = new mxPoint();
	};
	
	/**
	 * Extends mxRectangle.
	 */
	mxCellState.prototype = new mxRectangle();
	mxCellState.prototype.constructor = mxCellState;

	/**
	 * Variable: view
	 * 
	 * Reference to the enclosing <mxGraphView>.
	 */
	mxCellState.prototype.view = null;

	/**
	 * Variable: cell
	 *
	 * Reference to the <mxCell> that is represented by this state.
	 */
	mxCellState.prototype.cell = null;

	/**
	 * Variable: style
	 * 
	 * Contains an array of key, value pairs that represent the style of the
	 * cell.
	 */
	mxCellState.prototype.style = null;

	/**
	 * Variable: invalid
	 * 
	 * Specifies if the state is invalid. Default is true.
	 */
	mxCellState.prototype.invalid = true;

	/**
	 * Variable: origin
	 *
	 * <mxPoint> that holds the origin for all child cells. Default is a new
	 * empty <mxPoint>.
	 */
	mxCellState.prototype.origin = null;

	/**
	 * Variable: absolutePoints
	 * 
	 * Holds an array of <mxPoints> that represent the absolute points of an
	 * edge.
	 */
	mxCellState.prototype.absolutePoints = null;
	
	/**
	 * Variable: absoluteOffset
	 *
	 * <mxPoint> that holds the absolute offset. For edges, this is the
	 * absolute coordinates of the label position. For vertices, this is the
	 * offset of the label relative to the top, left corner of the vertex. 
	 */
	mxCellState.prototype.absoluteOffset = null;

	/**
	 * Variable: terminalDistance
	 * 
	 * Caches the distance between the end points for an edge.
	 */
	mxCellState.prototype.terminalDistance = 0;
	
	/**
	 * Variable: length
	 *
	 * Caches the length of an edge.
	 */
	mxCellState.prototype.length = 0;
	
	/**
	 * Variable: segments
	 * 
	 * Array of numbers that represent the cached length of each segment of the
	 * edge.
	 */
	mxCellState.prototype.segments = null;
	
	/**
	 * Variable: shape
	 * 
	 * Holds the <mxShape> that represents the cell graphically.
	 */
	mxCellState.prototype.shape = null;
	
	/**
	 * Variable: text
	 * 
	 * Holds the <mxText> that represents the label of the cell. Thi smay be
	 * null if the cell has no label.
	 */
	mxCellState.prototype.text = null;

	/**
	 * Function: getPerimeterBounds
	 * 
	 * Returns the <mxRectangle> that should be used as the perimeter of the
	 * cell.
	 */
	mxCellState.prototype.getPerimeterBounds = function (border)
	{
		border = border || 0;
		var bounds = new mxRectangle(this.x, this.y, this.width, this.height);
		
		if (border != 0)
		{
			bounds.grow(border);
		}
		
		return bounds;
	};
	
	/**
	 * Function: setAbsoluteTerminalPoint
	 * 
	 * Sets the first or last point in <absolutePoints> depending on isSource.
	 * 
	 * Parameters:
	 * 
	 * point - <mxPoint> that represents the terminal point.
	 * isSource - Boolean that specifies if the first or last point should
	 * be assigned.
	 */
	mxCellState.prototype.setAbsoluteTerminalPoint = function (point, isSource)
	{
		if (isSource)
		{
			if (this.absolutePoints == null)
			{
				this.absolutePoints = new Array();
			}
			
			if (this.absolutePoints.length == 0)
			{
				this.absolutePoints.push(point);
			}
			else
			{
				this.absolutePoints[0] = point;
			}
		}
		else
		{
			if (this.absolutePoints == null)
			{
				this.absolutePoints = new Array();
				this.absolutePoints.push(null);
				this.absolutePoints.push(point);
			}
			else if (this.absolutePoints.length == 1)
			{
				this.absolutePoints.push(point);
			}
			else
			{
				this.absolutePoints[this.absolutePoints.length - 1] = point;
			}
		}
	};

	/**
	 * Destructor: destroy
	 * 
	 * Destroys the state and all associated resources.
	 */
	mxCellState.prototype.destroy = function ()
	{
		this.view.graph.cellRenderer.destroy(this);
		this.view.graph.destroyHandler(this);
	};
	
	/**
	 * Function: clone
	 *
	 * Returns a clone of this <mxPoint>.
	 */
	mxCellState.prototype.clone = function()
	{
	 	var clone = new mxCellState(this.view, this.cell, this.style);

		// Clones the absolute points
		if (this.absolutePoints != null)
		{
			clone.absolutePoints = new Array();
			
			for (i = 0; i < this.absolutePoints.length; i++)
			{
				clone.absolutePoints.push(this.absolutePoints[i].clone());
			}
		}

		if (this.origin != null)
		{
			clone.origin = this.origin.clone();
		}
		
		// Clones the offset
		if (this.absoluteOffset != null)
		{
			clone.absoluteOffset = this.absoluteOffset.clone();
		}
		
		// Clones the source and targetpoint
		if (this.sourcePoint != null)
		{
			clone.sourcePoint = this.sourcePoint.clone();
		}
		
		if (this.boundingBox != null)
		{
			clone.boundingBox = this.boundingBox.clone();
		}

		clone.terminalDistance = this.terminalDistance;
		clone.segments = this.segments;
		clone.length = this.length;
		clone.x = this.x;
		clone.y = this.y;
		clone.width = this.width;
		clone.height = this.height;
		
		return clone;
	};

}
