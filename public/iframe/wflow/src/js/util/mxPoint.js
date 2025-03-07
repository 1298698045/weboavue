/**
 * $Id: mxPoint.js,v 1.6 2007/11/23 22:45:03 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxPoint
 *
 * Implements a 2-dimensional vector with double precision coordinates.
 */
{

	/**
	 * Constructor: mxPoint
	 *
	 * Constructs a new point for the optional x and y coordinates. If no
	 * coordinates are given, then the default values for <x> and <y> are used.
	 */
	function mxPoint(x, y)
	{
		this.x = (x != null) ? x : 0;
		this.y = (y != null) ? y : 0;
	};

	/**
	 * Variable: x
	 *
	 * Holds the x-coordinate of the point. Default is 0.
	 */
	mxPoint.prototype.x = null;

	/**
	 * Variable: y
	 *
	 * Holds the y-coordinate of the point. Default is 0.
	 */
	mxPoint.prototype.y = null;
	
	/**
	 * Function: clone
	 *
	 * Returns a clone of this <mxPoint>.
	 */
	mxPoint.prototype.clone = function()
	{
		return mxUtils.clone(this);
	};

}
