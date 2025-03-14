/**
 * $Id: mxDefaultToolbarCodec.js,v 1.11 2008/02/20 19:43:01 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxDefaultToolbarCodec
 *
 * Custom codec for configuring <mxDefaultToolbar>s. This class is created
 * and registered dynamically at load time and used implicitely via
 * <mxCodec> and the <mxCodecRegistry>. This codec only reads configuration
 * data for existing toolbars handlers, it does not encode or create toolbars.
 */
mxCodecRegistry.register(function()
{
	// Constructs the codec
	var codec = new mxObjectCodec(new mxDefaultToolbar());

	/**
	 * Function: encode
	 *
	 * Returns null.
	 */
	codec.encode = function(enc, obj) {
		return null;
	};
	
	/**
	 * Function: decode
	 *
	 * Reads a sequence of the following child nodes
	 * and attributes:
	 *
	 * Child Nodes:
	 *
	 * add - Adds a new item to the toolbar. See below for attributes.
	 * separator - Adds a vertical separator. No attributes.
	 * hr - Adds a horizontal separator. No attributes.
	 * br - Adds a linefeed. No attributes. 
	 *
	 * Attributes:
	 *
	 * as - Resource key for the label.
	 * action - Name of the action to execute in enclosing editor.
	 * mode - Modename (see below).
	 * template - Template name for cell insertion.
	 * style - Optional style to override the template style.
	 * icon - Icon (relative/absolute URL).
	 * pressedIcon - Optional icon for pressed state (relative/absolute URL).
	 *
	 * The action, mode and template attributes are mutually exclusive. The
	 * style can only be used with the template attribute. The add node may
	 * contain another sequence of add nodes with as and action attributes
	 * to create a combo box in the toolbar. If the icon is specified then
	 * a list of the child node is expected to have its template attribute
	 * set and the action is ignored instead.
	 * 
	 * Nodes with a specified template may define a function to be used for
	 * inserting the cloned template into the graph. Here is an example of such
	 * a node:
	 * 
	 * (code)
	 * <add as="Swimlane" template="swimlane" icon="images/swimlane.gif"><![CDATA[
	 *   function (editor, cell, evt, targetCell)
	 *   {
	 *     var pt = mxUtils.convertPoint(
	 *       editor.graph.container,
	 *       evt.clientX, evt.clientY);
	 *     return editor.addVertex(targetCell, cell, pt.x, pt.y);
	 *   }
	 * ]]></add>
	 * (end)
	 * 
	 * In the above function, editor is the enclosing <mxEditor> instance, cell
	 * is the clone of the template, evt is the mouse event that represents the
	 * drop and targetCell is the cell under the mousepointer where the drop
	 * occurred. The targetCell is retrieved using <mxGraph.getCellAt>.
	 *
	 * Futhermore, nodes with the mode attribute may define a function to
	 * be executed upon selection of the respective toolbar icon. In the
	 * example below, the default edge style is set when this specific
	 * connect-mode is activated:
	 *
	 * (code)
	 * <add as="connect" mode="connect"><![CDATA[
	 *   function (editor)
	 *   {
	 *     if (editor.defaultEdge != null)
	 *     {
	 *       editor.defaultEdge.style = 'straightEdge';
	 *     }
	 *   }
	 * ]]></add>
	 * (end)
	 *
	 * Modes:
	 *
	 * select - Left mouse button used for rubberband- & cell-selection.
	 * connect - Allows connecting vertices by inserting new edges.
	 * pan - Disables selection and switches to panning on the left button.
	 *
	 * Example:
	 *
	 * To add items to the toolbar:
	 * 
	 * (code)
	 * <mxDefaultToolbar as="toolbar">
	 *   <add as="save" action="save" icon="images/save.gif"/>
	 *   <br/><hr/>
	 *   <add as="select" mode="select" icon="images/select.gif"/>
	 *   <add as="connect" mode="connect" icon="images/connect.gif"/>
	 * </mxDefaultToolbar>
	 * (end)
	 */
	codec.decode = function(dec, node, into)
	{
		if (into != null)
		{
			var editor = into.editor;
			var model = editor.graph.getModel();
			node = node.firstChild;
			
			while (node != null)
			{
				if (node.nodeType == mxConstants.NODETYPE_ELEMENT)
				{
					if (!this.processInclude(dec, node, into))
					{
						if (node.nodeName == 'separator')
						{
							into.addSeparator();
						}
						else if (node.nodeName == 'br')
						{
							into.toolbar.addBreak();
						}
						else if (node.nodeName == 'hr')
						{
							into.toolbar.addLine();
						}
						else if (node.nodeName == 'add')
						{
							var as = node.getAttribute('as');
							as = mxResources.get(as) || as;
							var icon = node.getAttribute('icon');
							var pressedIcon = node.getAttribute('pressedIcon');
							var action = node.getAttribute('action');
							var mode = node.getAttribute('mode');
							var template = node.getAttribute('template');

							if (action != null)
							{
								into.addItem(as, icon, action, pressedIcon);
							}
							else if (mode != null)
							{
								var funct = mxUtils.eval(mxUtils.getTextContent(node));
								into.addMode(as, icon, mode, pressedIcon, funct);
							}
							else if (template != null)
							{
								var cell = editor.templates[template];
								var style = node.getAttribute('style');
								
								if (style != null) {
									cell = cell.clone();
									cell.setStyle(style);
								}
								
								var insertFunction = null;
								var text = mxUtils.getTextContent(node);
								
								if (text != null)
								{
									insertFunction = mxUtils.eval(text);
								}
								
								into.addPrototype(as, icon, cell, pressedIcon, insertFunction);
							}
							else
							{
								var children = mxUtils.getChildNodes(node);
								
								if (children.length > 0)
								{
									if (icon == null)
									{
										var combo = into.addActionCombo(as);
										
										for (var i=0; i<children.length; i++)
										{
											var child = children[i];
											
											if (child.nodeName == 'separator')
											{
												into.addOption(combo, '---');
											}
											else if (child.nodeName == 'add')
											{
												var lab = child.getAttribute('as');
												var act = child.getAttribute('action');
												into.addActionOption(combo, lab, act);
											}
										}
									}
									else
									{
										var select = null;
										var create = function()
										{
											var template = editor.templates[select.value];
											
											if (template != null)
											{
												var clone = template.clone();
												var style = select.options[select.selectedIndex].cellStyle;
												
												if (style != null)
												{
													clone.setStyle(style);
												}
												
												return clone;
											}
											else
											{
												mxLog.warn('Template '+template+' not found');
											}
											
											return null;
										}
										
										var img = into.addPrototype(as, icon, create);
										select = into.addCombo();
										
										// Selects the toolbar icon if a selection change
										// is made in the corresponding combobox.
										mxEvent.addListener(select, 'change', function()
										{
											into.toolbar.selectMode(img, function(evt)
											{
												var pt = mxUtils.convertPoint(
													editor.graph.container, evt.clientX, evt.clientY);
												return editor.addVertex(null, funct(), pt.x, pt.y);
											});
											into.toolbar.noReset = false;
										});
										
										// Adds the entries to the combobox
										for (var i=0; i<children.length; i++)
										{
											var child = children[i];
											
											if (child.nodeName == 'separator')
											{
												into.addOption(select, '---');
											}
											else if (child.nodeName == 'add')
											{
												var lab = child.getAttribute('as');
												var tmp = child.getAttribute('template');
												var option = into.addOption(select, lab, tmp || template);
												option.cellStyle = child.getAttribute('style');
											}
										}
										
									}
								}
							}
						}
					}
				}
				
				node = node.nextSibling;
			}
		}
		
		return into;
	};
	
	// Returns the codec into the registry
	return codec;

}());
