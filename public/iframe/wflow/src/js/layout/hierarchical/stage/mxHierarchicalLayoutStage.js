/**
 * $Id: mxHierarchicalLayoutStage.js,v 1.3 2008/06/30 13:07:57 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxHierarchicalLayoutStage
 * 
 * The specific layout interface for hierarchical layouts. It adds a
 * <code>run</code> method with a parameter for the hierarchical layout model
 * that is shared between the layout stages.
 */
{

	/**
	 * Constructor: mxHierarchicalLayoutStage
	 *
	 * Constructs a new hierarchical layout stage.
	 */
	function mxHierarchicalLayoutStage() { };

	/**
	 * Function: execute
	 * 
	 * Takes the graph detail and configuration information within the facade
	 * and creates the resulting laid out graph within that facade for further
	 * use.
	 */
	mxHierarchicalLayoutStage.prototype.execute = function(parent) { };

}
