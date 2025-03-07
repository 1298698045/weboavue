/**
 * $Id: mxStylesheetCodec.js,v 1.14 2009/01/27 12:32:43 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxStylesheetCodec
 *
 * Codec for <mxStylesheet>s. This class is created and registered
 * dynamically at load time and used implicitely via <mxCodec>
 * and the <mxCodecRegistry>.
 */
mxCodecRegistry.register(function()
{
	// Constructs the codec
	var codec = new mxObjectCodec(new mxStylesheet());

	/**
	 * Function: encode
	 *
	 * Encodes a stylesheet. See <decode> for a description of the
	 * format.
	 */
	codec.encode = function(enc, obj)
	{
		var node = enc.document.createElement(mxUtils.getFunctionName(obj.constructor));
		
		for (var i in obj.styles)
		{
			var style = obj.styles[i];
			var styleNode = enc.document.createElement('add');
			
			if (i != null)
			{
				styleNode.setAttribute('as', i);
				
				for (var j in style)
				{
					var entry = enc.document.createElement('add');
					entry.setAttribute('as', j);
					var type = typeof(style[j]);
					
					if (type == 'function')
					{
						// Tries to turn the function into a string
						var name = mxStyleRegistry.getName(style[j]);
						
						if (name != null)
						{
							entry.setAttribute('value', name);
						}
					}
					else if (type != 'object')
					{
						entry.setAttribute('value', style[j]);
					}

					styleNode.appendChild(entry);
				}
				
				if (styleNode.childNodes.length > 0)
				{
					node.appendChild(styleNode);
				}
			}
		}
		
	    return node;
	};
	
	/**
	 * Function: decode
	 *
	 * Reads a sequence of the following child nodes
	 * and attributes:
	 *
	 * Child Nodes:
	 *
	 * add - Adds a new style.
	 *
	 * Attributes:
	 *
	 * as - Name of the style.
	 * extend - Name of the style to inherit from.
	 *
	 * Each node contains another sequence of add and remove nodes with the following
	 * attributes:
	 *
	 * as - Name of the style (see <mxConstants>).
	 * value - Value for the style.
	 *
	 * Instead of the value-attribute, one can put Javascript expressions into
	 * the node as follows:
	 * <add as="perimeter">mxPerimeter.RectanglePerimeter</add>
	 *
	 * A remove node will remove the entry with the name given in the as-attribute
	 * from the style.
	 * 
	 * Example:
	 *
	 * (code)
	 * <mxStylesheet as="stylesheet">
	 *   <add as="text">
	 *     <add as="fontSize" value="12"/>
	 *   </add>
	 *   <add as="defaultVertex" extend="text">
	 *     <add as="shape" value="rectangle"/>
	 *   </add>
	 * </mxStylesheet>
	 * (end)
	 */
	codec.decode = function(dec, node, into)
	{
		var obj = into || new this.template.constructor();
		var id = node.getAttribute('id');
		
		if (id != null)
		{
			dec.objects[id] = obj;
		}
		
		node = node.firstChild;
		
		while (node != null)
		{
			if (!this.processInclude(dec, node, obj) &&
				node.nodeName == 'add')
			{
				var as = node.getAttribute('as');
				
				if (as != null)
				{
					var extend = node.getAttribute('extend');
					var style = (extend != null) ? mxUtils.clone(obj.styles[extend]) : null;
					
					if (style == null)
					{
						if (extend != null)
						{
							mxLog.warn('mxStylesheetCodec.decode: stylesheet ' +
								extend + ' not found to extend');
						}
						
						style = new Object();
					}
					
					var entry = node.firstChild;
					
					while (entry != null)
					{
						if (entry.nodeType == mxConstants.NODETYPE_ELEMENT)
						{
						 	var key = entry.getAttribute('as');
						 	
						 	if (entry.nodeName == 'add')
						 	{
							 	var text = mxUtils.getTextContent(entry);
							 	var value = null;
							 	
							 	if (text != null &&
							 		text.length > 0)
							 	{
							 		value = mxUtils.eval(text);
							 	}
							 	else
							 	{
							 		value = entry.getAttribute('value');
							 		
							 		if (mxUtils.isNumeric(value))
							 		{
										value = parseFloat(value);
									}
							 	}

							 	if (value != null)
							 	{
							 		style[key] = value;
							 	}
						 	}
						 	else if (entry.nodeName == 'remove')
						 	{
						 		delete style[key];
						 	}
						}
						
						entry = entry.nextSibling;
					}
					
					obj.putCellStyle(as, style);
				}
			}
			
			node = node.nextSibling;
		}
		
		return obj;
	};

	// Returns the codec into the registry
	return codec;

}());
