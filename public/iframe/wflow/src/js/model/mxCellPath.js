/**
 * $Id: mxCellPath.js,v 1.8 2008/06/09 11:15:28 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxCellPath
 * 
 * Implements a mechanism for temporary cell Ids.
 */
var mxCellPath =
{

	/**
	 * Variable: PATH_SEPARATOR
	 * 
	 * Defines the separator between the path components. Default is ".".
	 */
	PATH_SEPARATOR: '.',
	
	/**
	 * Function: create
	 * 
	 * Creates the cell path for the given cell. The cell path is a
	 * concatenation of the indices of all ancestors on the (finite) path to
	 * the root, eg. "0.0.0.1".
	 * 
	 * Parameters:
	 * 
	 * cell - Cell whose path should be returned.
	 */
	create: function (cell)
	{
		var result = '';
		
		if (cell != null)
		{
			var parent = cell.getParent();
			
			while (parent != null)
			{
				var index = parent.getIndex(cell);
				result = index + mxCellPath.PATH_SEPARATOR + result;
				
				cell = parent;
				parent = cell.getParent();
			}
		}
		
		// Removes trailing separator
		var n = result.length;
		
		if (n > 1)
		{
			result = result.substring(0, n - 1);
		}
		
		return result;
	},
	
	/**
	 * Function: getParentPath
	 * 
	 * Returns the path for the parent of the cell represented by the given
	 * path. Returns null if the given path has no parent.
	 * 
	 * Parameters:
	 * 
	 * path - Path whose parent path should be returned.
	 */
	getParentPath: function (path)
	{
		if (path != null)
		{
			var index = path.lastIndexOf(mxCellPath.PATH_SEPARATOR);

			if (index >= 0)
			{
				return path.substring(0, index);
			}
			else if (path.length > 0)
			{
				return '';
			}
		}

		return null;
	},

	/**
	 * Function: resolve
	 * 
	 * Returns the cell for the specified cell path using the given root as the
	 * root of the path.
	 * 
	 * Parameters:
	 * 
	 * root - Root cell of the path to be resolved.
	 * path - String that defines the path.
	 */
	resolve: function (root, path)
	{
		var parent = root;
		
		if (path != null)
		{
			var tokens = path.split(mxCellPath.PATH_SEPARATOR);
			
			for (var i=0; i<tokens.length; i++)
			{
				parent = parent.getChildAt(parseInt(tokens[i]));
			}
		}
		
		return parent;
	}

};
