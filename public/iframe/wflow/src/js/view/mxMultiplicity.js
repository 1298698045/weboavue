/**
 * $Id: mxMultiplicity.js,v 1.13 2008/06/25 08:01:57 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxMultiplicity
 * 
 * Defines invalid connections along with the error messages that they produce.
 * To add or remove rules on a graph, you must add/remove instances of this
 * class to <mxGraph.multiplicities>.
 * 
 * Example:
 * 
 * (code)
 * graph.multiplicities.push(new mxMultiplicity(
 *   true, 'rectangle', null, null, 0, 2, ['circle'],
 *   'Only 2 targets allowed',
 *   'Only circle targets allowed'));
 * (end)
 * 
 * Defines a rule where each rectangle must be connected to no more than 2
 * circles and no other types of targets are allowed.
 */
{

	/**
	 * Constructor: mxMultiplicity
	 * 
	 * Instantiate class mxMultiplicity in order to describe allowed
	 * connections in a graph. Not all constraints can be enforced while
	 * editing, some must be checked at validation time. The <countError> and
	 * <typeError> are treated as resource keys in <mxResources>.
	 * 
	 * Parameters:
	 * 
	 * source - Boolean indicating if this rule applies to the source or target
	 * terminal.
	 * type - Type of the source or target terminal that this rule applies to.
	 * attr - Optional attribute name to match the source or target terminal.
	 * value - Optional attribute value to match the source or target terminal.
	 * min - Minimum number of edges for this rule. Default is 1.
	 * max - Maximum number of edges for this rule. n means infinite. Default
	 * is n.
	 * validNeighbors - Array of types of the opposite terminal for which this
	 * rule applies.
	 * countError - Error to be displayed for invalid number of edges.
	 * typeError - Error to be displayed for invalid opposite terminals.
	 * validNeighborsAllowed - Optional boolean indicating if the array of
	 * opposite types should be valid or invalid.
	 */
	function mxMultiplicity(source, type, attr, value, min, max,
		validNeighbors, countError, typeError, validNeighborsAllowed)
	{
		this.source = source;
		this.type = type;
		this.attr = attr;
		this.value = value;
		this.min = (min != null) ? min : 0;
		this.max = (max != null) ? max : 'n';
		this.validNeighbors = validNeighbors;
		this.countError = mxResources.get(countError) || countError;
		this.typeError = mxResources.get(typeError) || typeError;
		this.validNeighborsAllowed = (validNeighborsAllowed != null) ?
			validNeighborsAllowed : true;
	};

	/**
	 * Variable: type
	 * 
	 * Defines the type of the source or target terminal. The type is a string
	 * passed to <mxCell.is> to check if the rule applies to a cell.
	 */
	mxMultiplicity.prototype.type = null;

	/**
	 * Variable: attr
	 * 
	 * Optional string that specifies the attributename to be passed to
	 * <mxCell.is> to check if the rule applies to a cell.
	 */
	mxMultiplicity.prototype.attr = null;

	/**
	 * Variable: value
	 * 
	 * Optional string that specifies the value of the attribute to be passed
	 * to <mxCell.is> to check if the rule applies to a cell.
	 */
	mxMultiplicity.prototype.value = null;

	/**
	 * Variable: source
	 * 
	 * Boolean that specifies if the rule is applied to the source or target
	 * terminal of an edge.
	 */
	mxMultiplicity.prototype.source = null;

	/**
	 * Variable: min
	 * 
	 * Defines the minimum number of connections for which this rule applies.
	 * Default is 0.
	 */
	mxMultiplicity.prototype.min = null;

	/**
	 * Variable: max
	 * 
	 * Defines the maximum number of connections for which this rule applies.
	 * A value of 'n' means unlimited times. Default is 'n'. 
	 */
	mxMultiplicity.prototype.max = null;

	/**
	 * Variable: validNeighbors
	 * 
	 * Holds an array of strings that specify the type of neighbor for which
	 * this rule applies. The strings are used in <mxCell.is> on the opposite
	 * terminal to check if the rule applies to the connection.
	 */
	mxMultiplicity.prototype.validNeighbors = null;

	/**
	 * Variable: validNeighborsAllowed
	 * 
	 * Boolean indicating if the list of validNeighbors are those that are allowed
	 * for this rule or those that are not allowed for this rule.
	 */
	mxMultiplicity.prototype.validNeighborsAllowed = true;

	/**
	 * Variable: countError
	 * 
	 * Holds the localized error message to be displayed if the number of
	 * connections for which the rule applies is smaller than <min> or greater
	 * than <max>.
	 */
	mxMultiplicity.prototype.countError = null;

	/**
	 * Variable: typeError
	 * 
	 * Holds the localized error message to be displayed if the type of the
	 * neighbor for a connection does not match the rule.
	 */
	mxMultiplicity.prototype.typeError = null;

	/**
	 * Function: check
	 * 
	 * Checks the multiplicity for the given arguments and returns the error
	 * for the given connection or null if the multiplicity does not apply.
	 *  
	 * Parameters:
	 * 
	 * graph - Reference to the enclosing <mxGraph> instance.
	 * edge - <mxCell> that represents the edge to validate.
	 * source - <mxCell> that represents the source terminal.
	 * target - <mxCell> that represents the target terminal.
	 * sourceOut - Number of outgoing edges from the source terminal.
	 * targetIn - Number of incoming edges for the target terminal.
	 */
	mxMultiplicity.prototype.check = function(graph, edge, source, target, sourceOut, targetIn)
	{
		var error = '';
		var sourceValue = graph.model.getValue(source);
		var targetValue = graph.model.getTarget(source);
			
		if ((sourceValue != null &&
			targetValue != null) &&
			((this.source &&
			mxUtils.isNode(sourceValue, this.type, 	this.attr, this.value)) ||
			(!this.source &&
			mxUtils.isNode(targetValue, this.type, 	this.attr, this.value))))
		{
			if ((this.source &&
				(this.max == 0 ||
				(sourceOut >= this.max))) ||
				(!this.source &&
				(this.max == 0 ||
				(targetIn >= this.max))))
			{
				error += this.countError + '\n';
			}
			
			var valid = this.validNeighbors;
			var isValid = !this.validNeighborsAllowed;
			
			if (valid != null &&
				valid.length > 0)
			{
				for (var j = 0; j < valid.length; j++)
				{
					if (this.source &&
						mxUtils.isNode(targetValue, valid[j]))
					{
						isValid = this.validNeighborsAllowed;
						break;
					}
					else if (!this.source &&
						mxUtils.isNode(sourceValue, valid[j]))
					{
						isValid = this.validNeighborsAllowed;
						break;
					}
				}
				
				if (!isValid)
				{
					error += this.typeError + '\n';
				}
			}
		}
		
		return (error.length > 0) ? error : null;
	};

}
