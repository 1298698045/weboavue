/**
 * $Id: mxPerimeter.js,v 1.16 2009/01/26 11:19:31 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxPerimeter
 * 
 * Provides various perimeter functions to be used in a style
 * as the value of <mxConstants.STYLE_PERIMETER>.
 *
 * Example:
 * 
 * (code)
 * <add as="perimeter">mxPerimeter.RightAngleRectanglePerimeter</add>
 * (end)
 * 
 * Or programmatically:
 * 
 * (code)
 * style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
 * (end)
 * 
 * When adding new perimeter functions, it is recommended to use the 
 * mxPerimeter-namespace as follows:
 * 
 * (code)
 * mxPerimeter.CustomPerimeter = function (bounds, edgeState, terminalState,
 * 			isSource, next)
 * {
 *   var x = 0; // Calculate x-coordinate
 *   var y = 0; // Calculate y-coordainte
 *   return new mxPoint(x, y);
 * }
 * (end)
 * 
 * The parameters are explained in <RectanglePerimeter>.
 */
var mxPerimeter =
{

	/**
	 * Function: RectanglePerimeter
	 * 
	 * Describes a rectangular perimeter for the given bounds. The edgeState
	 * and terminalState refer to the states of the edge and terminal cells.
	 * The edge state may be null if the perimeter is used for inserting new
	 * edges. isSource is true if the given terminal is the source of the edge,
	 * and next refers to the nearest point on the edge. Note that you should
	 * not read the points from the edgeState at this point.
	 *
	 * Parameters:
	 * 
	 * bounds - <mxRectangle> that represents the absolute bounds of the
	 * vertex.
	 * edgeState - <mxCellState> that represents the incoming or outgoing edge.
	 * terminalState - <mxCellState> that represents the vertex.
	 * isSource - Boolean that specifies if the vertex is the source terminal.
	 * next - <mxPoint> that represents the nearest neighbour point on the
	 * given edge.
	 */
	RectanglePerimeter: function (bounds, edgeState, terminalState, isSource,
		next)
	{
		var cx = bounds.getCenterX();
		var cy = bounds.getCenterY();
		var dx = next.x - cx;
		var dy = next.y - cy;
		var alpha = Math.atan2(dy, dx);
		var p = new mxPoint(0, 0);
		var pi = Math.PI;
		var pi2 = Math.PI/2;
		var beta = pi2 - alpha;
		var t = Math.atan2(bounds.height, bounds.width);
		if (alpha < -pi + t || alpha > pi - t)
		{
			// Left edge
			p.x = bounds.x;
			p.y = cy - bounds.width * Math.tan(alpha) / 2;
		}
		else if (alpha < -t)
		{
			// Top Edge
			p.y = bounds.y;
			p.x = cx - bounds.height * Math.tan(beta) / 2;
		}
		else if (alpha < t)
		{
			// Right Edge
			p.x = bounds.x + bounds.width;
			p.y = cy + bounds.width * Math.tan(alpha) / 2;
		}
		else
		{
			// Bottom Edge
			p.y = bounds.y + bounds.height;
			p.x = cx + bounds.height * Math.tan(beta) / 2;
		}
		
		if (edgeState != null &&
			edgeState.view.graph.isOrthogonal(edgeState, terminalState))
		{
			if (next.x >= bounds.x &&
				next.x <= bounds.x + bounds.width)
			{
				p.x = next.x;
			}
			else if (next.y >= bounds.y &&
					   next.y <= bounds.y + bounds.height)
			{
				p.y = next.y;
			}
			if (next.x < bounds.x)
			{
				p.x = bounds.x;
			}
			else if (next.x > bounds.x + bounds.width)
			{
				p.x = bounds.x + bounds.width;
			}
			if (next.y < bounds.y)
			{
				p.y = bounds.y;
			}
			else if (next.y > bounds.y + bounds.height)
			{
				p.y = bounds.y + bounds.height;
			}
		}
		
		return p;
	},

	/**
	 * Function: EllipsePerimeter
	 * 
	 * Describes an elliptic perimeter. See <RectanglePerimeter>
	 * for a description of the parameters.
	 */
	EllipsePerimeter: function (bounds, edgeState, terminalState, isSource,
		next)
	{
		var x = bounds.x;
		var y = bounds.y;
		var a = bounds.width / 2;
		var b = bounds.height / 2;
		var cx = x + a;
		var cy = y + b;
		var px = next.x;
		var py = next.y;
		
		// Calculates straight line equation through
		// point and ellipse center y = d * x + h
		var dx = px - cx;
		var dy = py - cy;
		
		if (dx == 0 &&
			dy != 0)
		{
			return new mxPoint(cx, cy + b * dy / Math.abs(dy));
		}
	
		var orthogonal = edgeState != null &&
			edgeState.view.graph.isOrthogonal(edgeState, terminalState);
			
		if (orthogonal)
		{
			if (py >= y &&
				py <= y + bounds.height)
			{
				var ty = py - cy;
				var tx = Math.sqrt(a*a*(1-(ty*ty)/(b*b))) || 0;
				
				if (px <= x)
				{
					tx = -tx;
				}
				
				return new mxPoint(cx+tx, py);
			}
			
			if (px >= x &&
				px <= x + bounds.width)
			{
				var tx = px - cx;
				var ty = Math.sqrt(b*b*(1-(tx*tx)/(a*a))) || 0;
				
				if (py <= y)
				{
					ty = -ty;	
				}
				
				return new mxPoint(px, cy+ty);
			}
		}
		
		// Calculates intersection
		var d = dy / dx;
		var h = cy - d * cx;
		var e = a * a * d * d + b * b;
		var f = -2 * cx * e;
		var g = a * a * d * d * cx * cx +
				b * b * cx * cx -
				a * a * b * b;
		var det = Math.sqrt(f * f - 4 * e * g);
		
		// Two solutions (perimeter points)
		var xout1 = (-f + det) / (2 * e);
		var xout2 = (-f - det) / (2 * e);
		var yout1 = d * xout1 + h;
		var yout2 = d * xout2 + h;
		var dist1 = Math.sqrt(Math.pow((xout1 - px), 2)
					+ Math.pow((yout1 - py), 2));
		var dist2 = Math.sqrt(Math.pow((xout2 - px), 2)
					+ Math.pow((yout2 - py), 2));
					
		// Correct solution
		var xout = 0;
		var yout = 0;
		
		if (dist1 < dist2)
		{
			xout = xout1;
			yout = yout1;
		}
		else
		{
			xout = xout2;
			yout = yout2;
		}
		
		return new mxPoint(xout, yout);
	},

	/**
	 * Function: RhombusPerimeter
	 * 
	 * Describes a rhombus (aka diamond) perimeter. See <RectanglePerimeter>
	 * for a description of the parameters.
	 */
	RhombusPerimeter: function (bounds, edgeState, terminalState, isSource,
		next)
	{
		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.width;
		var h = bounds.height;
		
		var cx = x + w / 2;
		var cy = y + h / 2;

		var px = next.x;
		var py = next.y;

		// Special case for intersecting the diamond's corners
		if (cx == px)
		{
			if (cy > py)
			{
				return new mxPoint(cx, y); // top
			}
			else
			{
				return new mxPoint(cx, y + h); // bottom
			}
		}
		else if (cy == py)
		{
			if (cx > px)
			{
				return new mxPoint(x, cy); // left
			}
			else
			{
				return new mxPoint(x + w, cy); // right
			}
		}
		
		var tx = cx;
		var ty = cy;
		
		if (edgeState != null &&
			edgeState.view.graph.isOrthogonal(edgeState, terminalState))
		{
			if (px >= x &&
				px <= x + w)
			{
				tx = px;
			}
			else if (py >= y &&
					  py <= y + h)
			{
				ty = py;
			}
		}
		
		// In which quadrant will the intersection be?
		// set the slope and offset of the border line accordingly
		if (px < cx)
		{
			if (py < cy)
			{
				return mxUtils.intersection(px, py, tx, ty, cx, y, x, cy);
			}
			else
			{
				return mxUtils.intersection(px, py, tx, ty, cx, y + h, x, cy);
			}
		}
		else if (py < cy)
		{
			return mxUtils.intersection(px, py, tx, ty, cx, y, x + w, cy);
		}
		else
		{
			return mxUtils.intersection(px, py, tx, ty, cx, y + h, x + w, cy);
		}
	},
	
	/**
	 * Function: TrianglePerimeter
	 * 
	 * Describes a triangle perimeter. See <RectanglePerimeter>
	 * for a description of the parameters.
	 */
	TrianglePerimeter: function (bounds, edgeState, terminalState, isSource,
		next)
	{
		var orthogonal = edgeState != null &&
			edgeState.view.graph.isOrthogonal(edgeState, terminalState);

		var direction = (terminalState != null) ?
			terminalState.style[mxConstants.STYLE_DIRECTION] : null;
		var vertical = direction == mxConstants.DIRECTION_NORTH ||
			direction == mxConstants.DIRECTION_SOUTH;

		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.width;
		var h = bounds.height;
		
		var cx = x + w / 2;
		var cy = y + h / 2;
		
		var start = new mxPoint(x, y);
		var corner = new mxPoint(x + w, cy);
		var end = new mxPoint(x, y + h);
		
		if (direction == mxConstants.DIRECTION_NORTH)
		{
			start = end;
			corner = new mxPoint(cx, y);
			end = new mxPoint(x + w, y + h);
		}
		else if (direction == mxConstants.DIRECTION_SOUTH)
		{
			corner = new mxPoint(cx, y + h);
			end = new mxPoint(x + w, y);
		}
		else if (direction == mxConstants.DIRECTION_WEST)
		{
			start = new mxPoint(x + w, y);
			corner = new mxPoint(x, cy);
			end = new mxPoint(x + w, y + h);
		}

		var dx = next.x - cx;
		var dy = next.y - cy;

		var alpha = (vertical) ? Math.atan2(dx, dy) : Math.atan2(dy, dx);
		var t = (vertical) ? Math.atan2(w, h) : Math.atan2(h, w);
		
		var base = false;
		
		if (direction == mxConstants.DIRECTION_NORTH ||
			direction == mxConstants.DIRECTION_WEST)
		{
			base = alpha > -t && alpha < t;
		}
		else
		{
			base = alpha < -Math.PI + t || alpha > Math.PI - t;	
		}

		var result = null;			

		if (base)
		{
			if (orthogonal &&
				((vertical &&
				next.x >= start.x &&
				next.x <= end.x) ||
				(!vertical &&
				next.y >= start.y &&
				next.y <= end.y)))
			{
				if (vertical)
				{
					result = new mxPoint(next.x, start.y);
				}
				else
				{
					result = new mxPoint(start.x, next.y);
				}
			}
			else
			{
				if (direction == mxConstants.DIRECTION_NORTH)
				{
					result = new mxPoint(x + w / 2 + h * Math.tan(alpha) / 2,
						y + h);
				}
				else if (direction == mxConstants.DIRECTION_SOUTH)
				{
					result = new mxPoint(x + w / 2 - h * Math.tan(alpha) / 2,
						y);
				}
				else if (direction == mxConstants.DIRECTION_WEST)
				{
					result = new mxPoint(x + w, y + h / 2 +
						w * Math.tan(alpha) / 2);
				}
				else
				{
					result = new mxPoint(x, y + h / 2 -
						w * Math.tan(alpha) / 2);
				}
			}
		}
		else
		{
			if (orthogonal)
			{
				var pt = new mxPoint(cx, cy);
		
				if (next.y >= y && next.y <= y + h)
				{
					pt.x = (vertical) ? cx : (
						(direction == mxConstants.DIRECTION_WEST) ?
							x + w : x);
					pt.y = next.y;
				}
				else if (next.x >= x && next.x <= x + w)
				{
					pt.x = next.x;
					pt.y = (!vertical) ? cy : (
						(direction == mxConstants.DIRECTION_NORTH) ?
							y + h : y);
				}
				
				// Compute angle
				dx = next.x - pt.x;
				dy = next.y - pt.y;
				
				cx = pt.x;
				cy = pt.y;
			}

			if ((vertical && next.x <= x + w / 2) ||
				(!vertical && next.y <= y + h / 2))
			{
				result = mxUtils.intersection(next.x, next.y, cx, cy,
					start.x, start.y, corner.x, corner.y);
			}
			else
			{
				result = mxUtils.intersection(next.x, next.y, cx, cy,
					corner.x, corner.y, end.x, end.y);
			}
		}
		
		if (result == null)
		{
			result = new mxPoint(cx, cy);
		}
		
		return result;
	}
};
