/**
 * $Id: mxEditor.js,v 1.145 2009/01/12 15:57:49 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxEditor
 *
 * Extends <mxEventSource> to implement a application wrapper for a graph that
 * adds actions, I/O, auto-layout, command history, and standard dialogs and
 * widgets (eg. properties dialog, outline, toolbar, and popupmenu).
 * 
 * Actions:
 * 
 * Actions are functions stored in the <actions> array under their names. The
 * functions take the <mxEditor> as the first, and an optional <mxCell> as the
 * second argument and are invoked using <execute>. Any additional arguments
 * passed to execute are passed on to the action as-is.
 * 
 * A list of built-in actions is available in the <addActions> description.
 * 
 * Read/Write Diagrams:
 * 
 * To read a diagram from an XML string, for example from a textfield within the 
 * page, the following code is used:
 * 
 * (code)
 * var doc = mxUtils.parseXML(xmlString);
 * var node = doc.documentElement;
 * editor.readGraphModel(node);
 * (end)
 * 
 * For reading a diagram from a remote location, use the <open> method.
 * 
 * To save diagrams in XML on a server, you can set the <urlPost> variable. 
 * This variable will be used in  <getUrlPost> to construct a URL for the post 
 * request that is issued in the <save> method. The post request contains the 
 * XML representation of the diagram as returned by <writeGraphModel> in the 
 * xml parameter.
 * 
 * On the server side, the post request is processed using standard
 * technologies such as Java Servlets, CGI, .NET or ASP.
 * 
 * Here are some examples of processing a post request in various languages.
 * 
 * - Java: String.valueOf(request.getParameter("xml")).replace("\n", "&#xa;");
 * - PHP: str_replace("\n", "&#xa;", stripslashes($_POST["xml"]));
 * - .NET: context.Request.Params["xml"].Replace("\n", "&#xa;");
 * - ASPX: Request.Form["xml"].Replace("\n", "&#xa;");
 * 
 * Creating images:
 * 
 * A backend (Java, PHP or C#) is required for creating images. The
 * distribution contains an example for each backend (ImageHandler.java,
 * ImageHandler.cs and graph.php). More information about using a backend
 * to create images can be found in the readme.html files. Note that the
 * preview is implemented using VML/SVG in the browser and does not require
 * a backend. The backend is only required to creates images (bitmaps).
 * 
 * Special characters:
 * 
 * Note There are three characters that should always appear in XML content as
 * escapes, so that they do not interact with the syntax of the markup. These
 * are part of the language for all documents based on XML and for HTML.
 * 
 * - &lt; (<)
 * - &gt; (>)
 * - &amp; (&)
 * 
 * You may also want to represent the double-quote (") as &quot; and the single
 * quote (') as &apos; - particularly in attribute text when you need to use
 * the same type of quotes as those that surround the attribute value. Note,
 * however, that, although it is part of the XML language, &apos; is not
 * defined in HTML. For this reason the XHTML specification recommends instead
 * the use of &#39; if text may be passed to an HTML user agent.
 * 
 * If you are having problems with special characters on the server-side then
 * you may want to try the <escapePostData> flag.
 * 
 * For converting decimal escape sequences inside strings, a user has provided
 * us with the following function:
 * 
 * (code)
 * function html2js(text)
 * {
 *   var entitySearch = /&#[0-9]+;/;
 *   var entity;
 *   
 *   while (entity = entitySearch.exec(text))
 *   {
 *     var charCode = entity[0].substring(2, entity[0].length -1);
 *     text = text.substring(0, entity.index)
 *            + String.fromCharCode(charCode)
 *            + text.substring(entity.index + entity[0].length);
 *   }
 *   
 *   return text;
 * }
 * (end)
 * 
 * Otherwise try using hex escape sequences and the built-in unescape function
 * for converting such strings.
 * 
 * Local Files:
 * 
 * For saving and opening local files, no standardized method exists that
 * works across all browsers. The recommended way of dealing with local files
 * is to create a backend that streams the XML data back to the browser (echo)
 * as an attachment so that a Save-dialog is displayed on the client-side and
 * the file can be saved to the local disk.
 * 
 * For example, in PHP the code that does this looks as follows.
 * 
 * (code)
 * $xml = stripslashes($_POST["xml"]);
 * header("Content-Disposition: attachment; filename=\"diagram.xml\"");
 * echo($xml);
 * (end)
 * 
 * To open a local file, the file should be uploaded via a form in the browser
 * and then opened from the server in the editor.
 * 
 * Cell Properties:
 * 
 * The properties displayed in the properties dialog are the attributes and 
 * values of the cell's user object, which is an XML node. The XML node is 
 * defined in the templates section of the config file.
 * 
 * The templates are stored in <mxEditor.templates> and contain cells which
 * are cloned at insertion time to create new vertices by use of drag and
 * drop from the toolbar. Each entry in the toolbar for adding a new vertex
 * must refer to an existing template.
 * 
 * In the following example, the task node is a business object and only the 
 * mxCell node and its mxGeometry child contain graph information:
 * 
 * (code)
 * <Task label="Task" description="">
 *   <mxCell vertex="true">
 *     <mxGeometry as="geometry" width="72" height="32"/>
 *   </mxCell>
 * </Task> 
 * (end)
 * 
 * The idea is that the XML representation is inverse from the in-memory 
 * representation: The outer XML node is the user object and the inner node is 
 * the cell. This means the user object of the cell is the Task node with no 
 * children for the above example:
 * 
 * (code)
 * <Task label="Task" description=""/>
 * (end)
 * 
 * The Task node can have any tag name, attributes and child nodes. The 
 * <mxCodec> will use the XML hierarchy as the user object, while removing the 
 * "known annotations", such as the mxCell node. At save-time the cell data 
 * will be "merged" back into the user object. The user object is only modified 
 * via the properties dialog during the lifecycle of the cell.
 * 
 * In the default implementation of <createProperties>, the user object's
 * attributes are put into a form for editing. Attributes are changed using
 * the <mxCellAttributeChange> action in the model. The dialog can be replaced 
 * by overriding the <createProperties> hook or by replacing the showProperties
 * action in <actions>. Alternatively, the entry in the config file's popupmenu
 * section can be modified to invoke a different action.
 * 
 * If you want to displey the properties dialog on a doubleclick, you can set
 * <mxEditor.dblClickAction> to showProperties as follows:
 * 
 * (code)
 * editor.dblClickAction = 'showProperties';
 * (end)
 * 
 * Popupmenu and Toolbar:
 * 
 * The toolbar and popupmenu are typically configured using the respective
 * sections in the config file, that is, the popupmenu is defined as follows:
 * 
 * (code)
 * <mxEditor>
 *   <mxDefaultPopupMenu as="popupHandler">
 * 		<add as="cut" action="cut" icon="images/cut.gif"/>
 *      ...
 * (end)
 * 
 * New entries can be added to the toolbar by inserting an add-node into the
 * above configuration. Existing entries may be removed and changed by
 * modifying or removing the respective entries in the configuration.
 * The configuration is read by the <mxDefaultPopupMenuCodec>, the format of the
 * configuration is explained in <mxDefaultPopupMenu.decode>.
 * 
 * The toolbar is defined in the mxDefaultToolbar section. Items can be added
 * and removed in this section.
 * 
 * (code)
 * <mxEditor>
 *   <mxDefaultToolbar>
 *     <add as="save" action="save" icon="images/save.gif"/>
 *     <add as="Swimlane" template="swimlane" icon="images/swimlane.gif"/>
 *     ...
 * (end)
 * 
 * The format of the configuration is described in
 * <mxDefaultToolbarCodec.decode>.
 * 
 * Ids:
 * 
 * For the IDs, there is an implicit behaviour in <mxCodec>: It moves the Id
 * from the cell to the user object at encoding time and vice versa at decoding
 * time. For example, if the Task node from above has an id attribute, then
 * the <mxCell.id> of the corresponding cell will have this value. If there
 * is no Id collision in the model, then the cell may be retrieved using this
 * Id with the <mxGraphModel.getCell> function. If there is a collision, a new
 * Id will be created for the cell using <mxGraphModel.createId>. At encoding
 * time, this new Id will replace the value previously stored under the id
 * attribute in the Task node.
 * 
 * See <mxEditorCodec>, <mxDefaultToolbarCodec> and <mxDefaultPopupMenuCodec>
 * for information about configuring the editor and user interface.
 * 
 * Programmatically inserting cells:
 * 
 * For inserting a new cell, say, by clicking a button in the document,
 * the following code can be used. This requires an reference to the editor.
 * 
 * (code)
 * var userObject = new Object();
 * var parent = editor.graph.getDefaultParent();
 * var model = editor.graph.model;
 * model.beginUpdate();
 * try
 * {
 *   editor.graph.insertVertex(parent, null, userObject, 20, 20, 80, 30);
 * }
 * finally
 * {
 *   model.endUpdate();
 * }
 * (end)
 * 
 * If a template cell from the config file should be inserted, then a clone
 * of the template can be created as follows. The clone is then inserted using
 * the add function instead of addVertex.
 * 
 * (code)
 * var template = editor.templates['task'];
 * var clone = editor.graph.model.cloneCell(template);
 * (end)
 * 
 * Resources:
 *
 * js/resources/editor - Language resources for mxEditor
 *
 * Callback: onInit
 *
 * Called from within the constructor with a boolean flag
 * indicating whether the editor was started for the first
 * time on this client. In the callback, "this" refers to
 * the editor instance.
 *
 * Cookie: mxgraph=seen
 *
 * Set when the editor is started. Never expires. Use
 * <resetFirstTime> to reset this cookie. This cookie
 * only exists if <onInit> is implemented.
 *
 * Event: beforeOpen
 *
 * Fires before a file will be opened. First argument is the source <mxEditor>,
 * second argument is the filename that will be used.
 * 
 * Event: open
 *
 * Fires after a file has been opened. First argument is the source <mxEditor>,
 * second argument is the <filename> that was used.
 *
 * Event: afterOpen
 *
 * Fires after a file has been opened. First argument is the source <mxEditor>,
 * second argument is the filename, and third argument is the optional
 * exception object.
 * 
 * Event: beforeSave
 *
 * Fires before the current file will be saved. First argument is the source
 * <mxEditor>, second argument is a boolean that specifies if the save was
 * automatic.
 * 
 * Event: save
 *
 * Fires after the current file has been saved. First argument is the source
 * <mxEditor>, second argument is a boolean that specifies if the save was
 * automatic.
 * 
 * Event: afterSave
 *
 * Fires after the current file has been saved. First argument is the source
 * <mxEditor>, second argument is a boolean that specifies if the save was
 * automatic, third argument is the optional exception object.
 * 
 * Event: post
 * 
 * fires after <postDiagram> has received the response for a successful posting
 * of a diagram. 
 *
 * Event: root
 *
 * Fires when the current root has changed, or when the
 * title of the current root has changed.  First and only
 * argument to the listener is the source <mxEditor>.
 *
 * Event: session
 *
 * Fires when anything in the session has changed.
 * 
 * Event: beforeAddVertex
 * 
 * Fires before addVertex is executed. First argument is
 * the source <mxEditor>, second argument is the vertex
 * that will be added, third argument is the future
 * parent <mxCell>. This event fires before the transaction.
 * 
 * Event: addVertex
 * 
 * Fires when addVertex has been called. First argument is
 * the source <mxEditor>, second argument is the vertex
 * that has been added. This event fires while the
 * transaction is in progress.
 * 
 * Event: afterAddVertex
 * 
 * Fires after a vertex has been added using addVertex. First
 * argument is the source <mxEditor>, second argument is the
 * vertex that has been added. This event fires after the
 * transaction has been ended.
 * 
 * Example:
 * 
 * For starting an in-place edit after a new vertex has been
 * added to the graph, the following code can be used.
 * 
 * (code)
 * editor.addListener('afterAddVertex', function(sender, vertex)
 * {
 *   editor.graph.edit(vertex);
 * });
 * (end)
 * 
 * Event: escape
 * 
 * Fires when the escape key is pressed. First argument is
 * the source <mxEditor>, second argument is the keystroke
 * event.
 */
{

	/**
	 * Constructor: mxEditor
	 *
	 * Constructs a new editor. This function invokes the <onInit> callback
	 * upon completion.
	 *
	 * Example:
	 *
	 * (code)
	 * var config = mxUtils.load('config/diagrameditor.xml').getDocumentElement();
	 * var editor = new mxEditor(config);
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * config - Optional XML node that contains the configuration.
	 */
	function mxEditor(config)
	{
		this.actions = new Array();
		this.addActions();

		// Executes the following only if a document has been instanciated.
		// That is, don't execute when the editorcodec is setup.
		if (document.body != null)
		{
			// Defines instance fields
			this.cycleAttributeValues = new Array();
			this.popupHandler = new mxDefaultPopupMenu();
			this.undoManager = new mxUndoManager();

			// Creates the graph and toolbar without the containers
			this.graph = this.createGraph();
			this.toolbar = this.createToolbar();

			// Creates the global keyhandler (requires graph instance)
			this.keyHandler = new mxDefaultKeyHandler(this);

			// Configures the editor using the URI
			// which was passed to the ctor
			this.configure(config);
			
			// Assigns the swimlaneIndicatorColorAttribute on the graph
			this.graph.swimlaneIndicatorColorAttribute = this.cycleAttributeName;
			
			// Initializes the session if the urlInit
			// member field of this editor is set.
			if (!mxClient.IS_LOCAL &&
				this.urlInit != null)
			{
				this.createSession();
			}
	
			// Checks ifthe <onInit> hook has been set		
			if (this.onInit != null)
			{
				// Checks if the editor is used for the first time
				// by using the mxgraph=seen cookie
				var tmp = document.cookie;
				var isFirstTime = tmp.indexOf('mxgraph=seen') < 0;
				
				if (isFirstTime)
				{
					// Sets the cookie to remember that the editor has
					// been used
					document.cookie =
						'mxgraph=seen; expires=Fri, 27 Jul 2199 02:47:11 UTC; path=/';
				}

				// Invokes the <onInit> hook
				this.onInit(isFirstTime);
			}
			
			// Automatic deallocation of memory
			if (mxClient.IS_IE)
			{
				var self = this; // closure
				mxEvent.addListener(window, 'unload', function()
				{
					self.destroy();
				});
			}
		}
	};

	/**
	 * Installs the required language resources at class
	 * loading time.
	 */
	mxResources.add(mxClient.basePath+'js/resources/editor');

	/**
	 * Extends mxEventSource.
	 */
	mxEditor.prototype = new mxEventSource();
	mxEditor.prototype.constructor = mxEditor;
	
	/**
	 * Group: Controls and Handlers
	 */
		
	/**
	 * Variable: askZoomResource
	 * 
	 * Specifies the resource key for the zoom dialog. If the resource for this
	 * key does not exist then the value is used as the error message. Default
	 * is 'askZoom'.
	 */
	mxEditor.prototype.askZoomResource = (mxClient.language != 'none') ? 'askZoom' : '';
		
	/**
	 * Variable: lastSavedResource
	 * 
	 * Specifies the resource key for the last saved info. If the resource for
	 * this key does not exist then the value is used as the error message.
	 * Default is 'lastSaved'.
	 */
	mxEditor.prototype.lastSavedResource = (mxClient.language != 'none') ? 'lastSaved' : '';
		
	/**
	 * Variable: currentFileResource
	 * 
	 * Specifies the resource key for the current file info. If the resource for
	 * this key does not exist then the value is used as the error message.
	 * Default is 'lastSaved'.
	 */
	mxEditor.prototype.currentFileResource = (mxClient.language != 'none') ? 'currentFile' : '';
		
	/**
	 * Variable: propertiesResource
	 * 
	 * Specifies the resource key for the properties window title. If the
	 * resource for this key does not exist then the value is used as the
	 * error message. Default is 'properties'.
	 */
	mxEditor.prototype.propertiesResource = (mxClient.language != 'none') ? 'properties' : '';
		
	/**
	 * Variable: tasksResource
	 * 
	 * Specifies the resource key for the tasks window title. If the
	 * resource for this key does not exist then the value is used as the
	 * error message. Default is 'tasks'.
	 */
	mxEditor.prototype.tasksResource = (mxClient.language != 'none') ? 'tasks' : '';
		
	/**
	 * Variable: helpResource
	 * 
	 * Specifies the resource key for the help window title. If the
	 * resource for this key does not exist then the value is used as the
	 * error message. Default is 'help'.
	 */
	mxEditor.prototype.helpResource = (mxClient.language != 'none') ? 'help' : '';
		
	/**
	 * Variable: outlineResource
	 * 
	 * Specifies the resource key for the outline window title. If the
	 * resource for this key does not exist then the value is used as the
	 * error message. Default is 'outline'.
	 */
	mxEditor.prototype.outlineResource = (mxClient.language != 'none') ? 'outline' : '';
		
	/**
	 * Variable: outline
	 * 
	 * Reference to the <mxWindow> that contains the outline. The <mxOutline>
	 * is stored in outline.outline.
	 */
	mxEditor.prototype.outline = null;

	/**
	 * Variable: graph
	 *
	 * Holds a <mxGraph> for displaying the diagram. The graph
	 * is created in <setGraphContainer>.
	 */
	mxEditor.prototype.graph = null;

	/**
	 * Variable: graphRenderHint
	 *
	 * Holds the render hint used for creating the
	 * graph in <setGraphContainer>. See <mxGraph>.
	 * Default is null.
	 */
	mxEditor.prototype.graphRenderHint = null;

	/**
	 * Variable: toolbar
	 *
	 * Holds a <mxDefaultToolbar> for displaying the toolbar. The
	 * toolbar is created in <setToolbarContainer>.
	 */
	mxEditor.prototype.toolbar = null;

	/**
	 * Variable: status
	 *
	 * DOM container that holds the statusbar. Default is null.
	 * Use <setStatusContainer> to set this value.
	 */
	mxEditor.prototype.status = null;

	/**
	 * Variable: popupHandler
	 *
	 * Holds a <mxDefaultPopupMenu> for displaying
	 * popupmenus.
	 */
	mxEditor.prototype.popupHandler = null;

	/**
	 * Variable: undoManager
	 *
	 * Holds an <mxUndoManager> for the command history.
	 */
	mxEditor.prototype.undoManager = null;

	/**
	 * Variable: keyHandler
	 *
	 * Holds a <mxDefaultKeyHandler> for handling keyboard events.
	 * The handler is created in <setGraphContainer>.
	 */
	mxEditor.prototype.keyHandler = null;
	
	/**
	 * Group: Actions and Options
	 */

	/**
	 * Variable: actions
	 *
	 * Maps from actionnames to actions, which are functions taking
	 * the editor and the cell as arguments. Use <addAction>
	 * to add or replace an action and <execute> to execute an action
	 * by name, passing the cell to be operated upon as the second
	 * argument.
	 */
	mxEditor.prototype.actions = null;

	/**
	 * Variable: dblClickAction
	 *
	 * Specifies the name of the action to be executed
	 * when a cell is double clicked. Default is edit.
	 * 
	 * To handle a singleclick, use the following code.
	 * 
	 * (code)
	 * editor.graph.addListener('click', function(sender, evt, cell)
	 * {
	 *   if (cell != null && !mxEvent.isConsumed(evt))
	 *   {
	 *     // Do something useful...
	 *     mxEvent.consume(evt);
	 *   }
	 * });
	 * (end)
	 */
	mxEditor.prototype.dblClickAction = 'edit';

	/**
	 * Variable: swimlaneRequired
	 * 
	 * Specifies if new cells must be inserted
	 * into an existing swimlane. Otherwise, cells
	 * that are not swimlanes can be inserted as
	 * top-level cells. Default is false.
	 */
	mxEditor.prototype.swimlaneRequired = false;

	/**
	 * Variable: disableContextMenu
	 *
	 * Specifies if the context menu should be disabled in the graph container.
	 * Default is true.
	 */
	mxEditor.prototype.disableContextMenu = true;

	/**
	 * Variable: extendParentOnAddVertex
	 * 
	 * Specifies if the parent should be resized if a child vertex is inserted
	 * that is larger than the parent. Default is true.
	 */
	mxEditor.prototype.extendParentOnAddVertex = true;
	
	/**
	 * Group: Templates
	 */

	/**
	 * Variable: insertFunction
	 *
	 * Specifies the function to be used for inserting new
	 * cells into the graph. This is assigned from the
	 * <mxDefaultToolbar> if a vertex-tool is clicked.
	 */
	mxEditor.prototype.insertFunction = null;
	
	/**
	 * Variable: forcedInserting
	 *
	 * Specifies if a new cell should be inserted on a single
	 * click even using <insertFunction> if there is a cell 
	 * under the mousepointer, otherwise the cell under the 
	 * mousepointer is selected. Default is false.
	 */
	mxEditor.prototype.forcedInserting = false;

	/**
	 * Variable: templates
	 * 
	 * Maps from names to protoype cells to be used
	 * in the toolbar for inserting new cells into
	 * the diagram.
	 */
	mxEditor.prototype.templates = null;
	
	/**
	 * Variable: defaultEdge
	 * 
	 * Prototype edge cell that is used for creating
	 * new edges.
	 */
	mxEditor.prototype.defaultEdge = null;
	
	/**
	 * Variable: defaultEdgeStyle
	 * 
	 * Specifies the edge style to be returned in <getEdgeStyle>.
	 * Default is null.
	 */
	mxEditor.prototype.defaultEdgeStyle = null;

	/**
	 * Variable: defaultGroup
	 * 
	 * Prototype group cell that is used for creating
	 * new groups.
	 */
	mxEditor.prototype.defaultGroup = null;

	/**
	 * Variable: graphRenderHint
	 *
	 * Default size for the border of new groups. If null,
	 * then then <mxGraph.gridSize> is used. Default is
	 * null.
	 */
	mxEditor.prototype.groupBorderSize = null;

	/**
	 * Group: Backend Integration
	 */
	
	/**
	 * Variable: filename
	 *
	 * Contains the URL of the last opened file as a string.
	 * Default is null.
	 */
	mxEditor.prototype.filename = null;
	
	/**
	 * Variable: lineFeed
	 *
	 * Character to be used for encoding linefeeds in <save>.
	 */
	mxEditor.prototype.linefeed = '&#xa;';
	
	/**
	 * Variable: postParameterName
	 *
	 * Specifies if the name of the post parameter that contains the diagram
	 * data in a post request to the server. Default is xml.
	 */
	mxEditor.prototype.postParameterName = 'xml';
	
	/**
	 * Variable: escapePostData
	 *
	 * Specifies if the data in the post request for saving a diagram
	 * should be converted using encodeURIComponent. Default is false.
	 */
	mxEditor.prototype.escapePostData = false;
	
	/**
	 * Variable: urlPost
	 *
	 * Specifies the URL to be used for posting the diagram
	 * to a backend in <save>.
	 */
	mxEditor.prototype.urlPost = null;
	
	/**
	 * Variable: urlImage
	 *
	 * Specifies the URL to be used for creating a bitmap of
	 * the graph in the image action.
	 */
	mxEditor.prototype.urlImage = null;

	/**
	 * Variable: urlInit
	 *
	 * Specifies the URL to be used for initializing the session.
	 */
	mxEditor.prototype.urlInit = null;

	/**
	 * Variable: urlNotify
	 *
	 * Specifies the URL to be used for notifying the backend
	 * in the session.
	 */
	mxEditor.prototype.urlNotify = null;

	/**
	 * Variable: urlPoll
	 *
	 * Specifies the URL to be used for polling in the session.
	 */
	mxEditor.prototype.urlPoll = null;

	/**
	 * Group: Autolayout
	 */

	/**
	 * Variable: horizontalFlow
	 *
	 * Specifies the direction of the flow
	 * in the diagram. This is used in the
	 * layout algorithms. Default is false,
	 * ie. vertical flow.
	 */
	mxEditor.prototype.horizontalFlow = false;
	
	/**
	 * Variable: layoutDiagram
	 *
	 * Specifies if the top-level elements in the
	 * diagram should be layed out using a vertical
	 * or horizontal stack depending on the setting
	 * of <horizontalFlow>. The spacing between the
	 * swimlanes is specified by <swimlaneSpacing>.
	 * Default is false.
	 * 
	 * If the top-level elements are swimlanes, then
	 * the intra-swimlane layout is activated by
	 * the <layoutSwimlanes> switch.
	 */
	mxEditor.prototype.layoutDiagram = false;
	
	/**
	 * Variable: swimlaneSpacing
	 *
	 * Specifies the spacing between swimlanes if
	 * automatic layout is turned on in
	 * <layoutDiagram>. Default is 0.
	 */
	mxEditor.prototype.swimlaneSpacing = 0;
	
	/**
	 * Variable: maintainSwimlanes
	 * 
	 * Specifies if the swimlanes should be kept at the same
	 * width or height depending on the setting of
	 * <horizontalFlow>.  Default is false.
	 * 
	 * For horizontal flows, all swimlanes
	 * have the same height and for vertical flows, all swimlanes
	 * have the same width. Furthermore, the swimlanes are
	 * automatically "stacked" if <layoutDiagram> is true.
	 */
	mxEditor.prototype.maintainSwimlanes = false;
	
	/**
	 * Variable: layoutSwimlanes
	 *
	 * Specifies if the children of swimlanes should
	 * be layed out, either vertically or horizontally
	 * depending on <horizontalFlow>.
	 * Default is false.
	 */
	mxEditor.prototype.layoutSwimlanes = false;

	/**
	 * Group: Attribute Cycling
	 */
	 
	/**
	 * Variable: cycleAttributeValues
	 * 
	 * Specifies the attribute values to be cycled when
	 * inserting new swimlanes. Default is an empty
	 * array.
	 */
	mxEditor.prototype.cycleAttributeValues = null;
	
	/**
	 * Variable: cycleAttributeIndex
	 * 
	 * Index of the last consumed attribute index. If a new
	 * swimlane is inserted, then the <cycleAttributeValues>
	 * at this index will be used as the value for
	 * <cycleAttributeName>. Default is 0.
	 */
	mxEditor.prototype.cycleAttributeIndex = 0;
	
	/**
	 * Variable: cycleAttributeName
	 * 
	 * Name of the attribute to be assigned a <cycleAttributeValues>
	 * when inserting new swimlanes. Default is fillColor.
	 */
	mxEditor.prototype.cycleAttributeName = 'fillColor';
	
	/**
	 * Group: Windows
	 */

	/**
	 * Variable: helpWindowImage
	 *
	 * Icon for the help window.
	 */
	mxEditor.prototype.helpWindowImage = null;

	/**
	 * Variable: urlHelp
	 *
	 * Specifies the URL to be used for the contents of the
	 * Online Help window. This is usually specified in the
	 * resources file under urlHelp for language-specific
	 * online help support.
	 */
	mxEditor.prototype.urlHelp = null;

	/**
	 * Variable: tasksWindowImage
	 *
	 * Icon for the tasks window.
	 */
	mxEditor.prototype.tasksWindowImage = null;
	
	/**
	 * Variable: tasksTop
	 * 
	 * Specifies the top coordinate of the tasks window in pixels.
	 * Default is 20.
	 */
	mxEditor.prototype.tasksTop = 20;
		
	/**
	 * Variable: helpWidth
	 * 
	 * Specifies the width of the help window in pixels.
	 * Default is 300.
	 */
	mxEditor.prototype.helpWidth = 300;
		
	/**
	 * Variable: helpWidth
	 * 
	 * Specifies the width of the help window in pixels.
	 * Default is 260.
	 */
	mxEditor.prototype.helpHeight = 260;

	/**
	 * Variable: propertiesWidth
	 * 
	 * Specifies the width of the properties window in pixels.
	 * Default is 240.
	 */
	mxEditor.prototype.propertiesWidth = 240;
			
	/**
	 * Variable: propertiesHeight
	 * 
	 * Specifies the height of the properties window in pixels.
	 * If no height is specified then the window will be automatically
	 * sized to fit its contents. Default is null.
	 */
	mxEditor.prototype.propertiesHeight = null;
			
	/**
	 * Variable: movePropertiesDialog
	 *
	 * Specifies if the properties dialog should be automatically
	 * moved near the cell it is displayed for, otherwise the
	 * dialog is not moved. This value is only taken into 
	 * account if the dialog is already visible. Default is false.
	 */
	mxEditor.prototype.movePropertiesDialog = false;
	
	/**
	 * Group: Autosaving
	 */

	/**
	 * Variable: autoSaving
	 * 
	 * Specifies if <autosave> should be invoked when
	 * the graph model changes.
	 */
	mxEditor.prototype.autoSaving = false;

	/**
	 * Variable: validating
	 *
	 * Specifies if the <mxGraph.validate> should
	 * be invoked before autosaving the graph.
	 * Default is false.
	 */
	mxEditor.prototype.validating = false;
	
	/**
	 * Variable: modified
	 *
	 * True if the graph has been modified since it was last saved.
	 */
	mxEditor.prototype.modified = false;

	/**
	 * Variable: autoSaveDelay
	 * 
	 * Minimum amount of milliseconds between two consecutive autosaves. Eg. a
	 * value of 1 (s) means the graph is not stored more than once per second.
	 * Used for autosaving. See <autosave>.
	 */
	mxEditor.prototype.autoSaveDelay = 10;

	/**
	 * Variable: autoSaveThrottle
	 * 
	 * Minimum amount of seconds between two consecutive autosaves triggered by
	 * more than <autoSaveThreshhold> changes within a timespan of less than
	 * <autoSaveDelay> seconds. Eg. a value of 1 (s) means the graph is not
	 * stored more than once per second even if there are more than
	 * <autoSaveThreshold> changes within that timespan.
	 * Used for autosaving. See <autosave>.
	 */
	mxEditor.prototype.autoSaveThrottle = 2;

	/**
	 * Variable: autoSaveThreshold
	 * 
	 * Minimum amount of ignored changes before an autosave. Eg. a value of 2
	 * means after 2 change of the graph model the autosave will trigger if the
	 * condition below is true.
	 * Used for autosaving. See <autosave>.
	 */
	mxEditor.prototype.autoSaveThreshold = 5;

	/**
	 * Variable: ignoredChanges
	 * 
	 * Counter for ignored changes in autosave.
	 * Used for autosaving. See <autosave>.
	 */
	mxEditor.prototype.ignoredChanges = 0;

	/**
	 * Variable: lastSnapshot
	 * 
	 * Used for autosaving. See <autosave>.
	 */
	mxEditor.prototype.lastSnapshot = 0;

	/**
	 * Function: addActions
	 *
	 * Adds the built-in actions to the editor instance.
	 *
	 * save - Saves the graph using <urlPost>.
	 * print - Prints the graph.
	 * preview - Shows the graph in a new window.
	 * exportImage - Shows the graph as a bitmap image using <getUrlImage>.
	 * refresh - Refreshes the graph's display.
	 * cut - Copies the current selection into the clipboard
	 * and removes it from the graph.
	 * copy - Copies the current selection into the clipboard.
	 * paste - Pastes the clipboard into the graph.
	 * delete - Removes the current selection from the graph.
	 * group - Puts the current selection into a new group.
	 * ungroup - Removes the selected groups and selects the children.
	 * undo - Undoes the last change on the graph model.
	 * redo - Redoes the last change on the graph model.
	 * zoom - Sets the zoom via a dialog.
	 * zoomIn - Zooms into the graph.
	 * zoomOut - Zooms out of the graph
	 * actualSize - Resets the scale and translation on the graph.
	 * fit - Changes the scale so that the graph fits into the window.
	 * showProperties - Shows the properties dialog.
	 * selectAll - Selects all cells.
	 * selectNone - Clears the selection.
	 * selectVertices - Selects all vertices.
	 * selectEdges = Selects all edges.
	 * edit - Starts editing the current selection cell.
	 * enterGroup - Drills down into the current selection cell.
	 * exitGroup - Moves up in the drilling hierachy
	 * home - Moves to the topmost parent in the drilling hierarchy
	 * selectPrevious - Selects the previous cell.
	 * selectNext - Selects the next cell.
	 * selectParent - Selects the parent of the selection cell.
	 * selectChild - Selects the first child of the selection cell.
	 * collapse - Collapses the currently selected cells.
	 * expand - Expands the currently selected cells.
	 * bold - Toggle bold text style.
	 * italic - Toggle italic text style.
	 * underline - Toggle underline text style.
	 * shadow - Toggle shadow text style.
	 * alignCellsLeft - Aligns the selection cells at the left.
	 * alignCellsCenter - Aligns the selection cells in the center.
	 * alignCellsRight - Aligns the selection cells at the right.
	 * alignCellsTop - Aligns the selection cells at the top.
	 * alignCellsMiddle - Aligns the selection cells in the middle.
	 * alignCellsBottom - Aligns the selection cells at the bottom.
	 * alignFontLeft - Sets the horizontal text alignment to left.
	 * alignFontCenter - Sets the horizontal text alignment to center.
	 * alignFontRight - Sets the horizontal text alignment to right.
	 * alignFontTop - Sets the vertical text alignment to top.
	 * alignFontMiddle - Sets the vertical text alignment to middle.
	 * alignFontBottom - Sets the vertical text alignment to bottom.
	 * toggleTasks - Shows or hides the tasks window.
	 * toggleHelp - Shows or hides the help window.
	 * toggleOutline - Shows or hides the outline window.
	 * toggleConsole - Shows or hides the console window.
	 */
	mxEditor.prototype.addActions = function ()
	{
		this.addAction('save', function(editor)
		{
			editor.save();
		});
		
		this.addAction('print', function(editor)
		{
			mxUtils.print(editor.graph);
		});
		
		this.addAction('preview', function(editor)
		{
			mxUtils.show(editor.graph);
		});
		
		this.addAction('exportImage',
			function(editor)
			{
				if (mxClient.IS_LOCAL)
				{
					editor.execute('preview');
				}
				else
				{
					var url = editor.getUrlImage();
					
					if (url != null)
					{
						var enc = new mxCodec();
						var node = enc.encode(editor.graph.getView());
						var xml = mxUtils.getXml(node, '\n');
						
						mxUtils.submit(url, editor.postParameterName+'='+xml);
					}
					else
					{
						mxUtils.alert(mxResources.get('notAvailable'));
					}
				}
			}
		);
		
		this.addAction('refresh', function(editor)
		{
			editor.graph.refresh();
		});
		
		this.addAction('cut', function(editor)
		{
			mxClipboard.cut(editor.graph);
		});
		
		this.addAction('copy', function(editor)
		{
			mxClipboard.copy(editor.graph);
		});
		
		this.addAction('paste', function(editor)
		{
			mxClipboard.paste(editor.graph);
		});
		
		this.addAction('delete', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.remove();
			}
		});
		
		this.addAction('group', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.group();
			}
		});
		
		this.addAction('ungroup', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.ungroup();
			}
		});
		
		this.addAction('removeFromParent', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.removeFromParent();
			}
		});
		
		this.addAction('undo', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.undo();
			}
		});
		
		this.addAction('redo', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.redo();
			}
		});
		
		this.addAction('zoomIn', function(editor)
		{
			editor.graph.zoomIn();
		});
		
		this.addAction('zoomOut', function(editor)
		{
			editor.graph.zoomOut();
		});
		
		this.addAction('actualSize', function(editor)
		{
			editor.graph.zoomActual();
		});
		
		this.addAction('fit', function(editor)
		{
			editor.graph.fit();
		});
		
		this.addAction('showProperties', function(editor, cell)
		{
			editor.showProperties(cell);
		});
		
		this.addAction('selectAll', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectAll();
			}
		});
		
		this.addAction('selectNone', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.clearSelection();
			}
		});
		
		this.addAction('selectVertices', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectVertices();
			}
		});
		
		this.addAction('selectEdges', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectEdges();
			}
		});
		
		this.addAction('edit', function(editor, cell)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.edit(cell);
			}
		});
		
		this.addAction('toBack', function(editor, cell)
		{
			editor.graph.toBack();
		});
		
		this.addAction('toFront', function(editor, cell)
		{
			editor.graph.toFront();
		});
		
		this.addAction('enterGroup', function(editor, cell)
		{
			editor.graph.enterGroup(cell);
		});
		
		this.addAction('exitGroup', function(editor)
		{
			editor.graph.exitGroup();
		});
		
		this.addAction('home', function(editor)
		{
			editor.graph.home();
		});
		
		this.addAction('selectPrevious', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectPrevious();
			}
		});
		
		this.addAction('selectNext', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectNext();
			}
		});
		
		this.addAction('selectParent', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectParent();
			}
		});
		
		this.addAction('selectChild', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.selectChild();
			}
		});
		
		this.addAction('collapse', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.collapse();
			}
		});
		
		this.addAction('collapseAll', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				var cells = editor.graph.getChildVertices();
				editor.graph.collapse(cells);
			}
		});
		
		this.addAction('expand', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				editor.graph.expand();
			}
		});
		
		this.addAction('expandAll', function(editor)
		{
			if (editor.graph.isEnabled())
			{
				var cells = editor.graph.getChildVertices();
				editor.graph.expand(cells);
			}
		});
		
		this.addAction('bold', function(editor)
		{
			editor.graph.toggleCellStyleFlags(
				mxConstants.STYLE_FONTSTYLE,
				mxConstants.FONT_BOLD);
		});
		
		this.addAction('italic', function(editor)
		{
			editor.graph.toggleCellStyleFlags(
				mxConstants.STYLE_FONTSTYLE,
				mxConstants.FONT_ITALIC);
		});
		
		this.addAction('underline', function(editor)
		{
			editor.graph.toggleCellStyleFlags(
				mxConstants.STYLE_FONTSTYLE,
				mxConstants.FONT_UNDERLINE);
		});
		
		this.addAction('shadow', function(editor)
		{
			editor.graph.toggleCellStyleFlags(
				mxConstants.STYLE_FONTSTYLE,
				mxConstants.FONT_SHADOW);
		});
		
		this.addAction('alignCellsLeft', function(editor)
		{
			editor.graph.alignCells(mxConstants.ALIGN_LEFT);
		});
		
		this.addAction('alignCellsCenter', function(editor)
		{
			editor.graph.alignCells(mxConstants.ALIGN_CENTER);
		});
		
		this.addAction('alignCellsRight', function(editor)
		{
			editor.graph.alignCells(mxConstants.ALIGN_RIGHT);
		});
		
		this.addAction('alignCellsTop', function(editor)
		{
			editor.graph.alignCells(mxConstants.ALIGN_TOP);
		});
		
		this.addAction('alignCellsMiddle', function(editor)
		{
			editor.graph.alignCells(mxConstants.ALIGN_MIDDLE);
		});
		
		this.addAction('alignCellsBottom', function(editor)
		{
			editor.graph.alignCells(mxConstants.ALIGN_BOTTOM);
		});
		
		this.addAction('alignFontLeft', function(editor)
		{
			editor.graph.setCellStyles(
				mxConstants.STYLE_ALIGN,
				mxConstants.ALIGN_LEFT);
		});
		
		this.addAction('alignFontCenter', function(editor)
		{
			editor.graph.setCellStyles(
				mxConstants.STYLE_ALIGN,
				mxConstants.ALIGN_CENTER);
		});
		
		this.addAction('alignFontRight', function(editor)
		{
			editor.graph.setCellStyles(
				mxConstants.STYLE_ALIGN,
				mxConstants.ALIGN_RIGHT);
		});
		
		this.addAction('alignFontTop', function(editor)
		{
			editor.graph.setCellStyles(
				mxConstants.STYLE_VERTICAL_ALIGN,
				mxConstants.ALIGN_TOP);
		});
		
		this.addAction('alignFontMiddle', function(editor)
		{
			editor.graph.setCellStyles(
				mxConstants.STYLE_VERTICAL_ALIGN,
				mxConstants.ALIGN_MIDDLE);
		});
		
		this.addAction('alignFontBottom', function(editor)
		{
			editor.graph.setCellStyles(
				mxConstants.STYLE_VERTICAL_ALIGN,
				mxConstants.ALIGN_BOTTOM);
		});
		
		this.addAction('zoom', function(editor)
		{
			var current = editor.graph.getView().scale*100;
			var scale = parseFloat(mxUtils.prompt(
				mxResources.get(editor.askZoomResource) ||
				editor.askZoomResource,
				current))/100;

			if (!isNaN(scale))
			{
				editor.graph.getView().setScale(scale);
			}
		});
		
		this.addAction('toggleTasks', function(editor)
		{
			if (editor.tasks != null)
			{
				editor.tasks.setVisible(!editor.tasks.isVisible());
			}
			else
			{
				editor.showTasks();
			}
		});
		
		this.addAction('toggleHelp', function(editor)
		{
			if (editor.help != null)
			{
				editor.help.setVisible(!editor.help.isVisible());
			}
			else
			{
				editor.showHelp();
			}
		});
		
		this.addAction('toggleOutline', function(editor)
		{
			if (editor.outline == null)
			{
				editor.showOutline();
			}
			else
			{
				editor.outline.setVisible(!editor.outline.isVisible());
			}
		});
		
		this.addAction('toggleConsole', function(editor)
		{
			mxLog.setVisible(!mxLog.isVisible());
		});
	};

	/**
	 * Function: createSession
	 *
	 * Creates the built-in session using <urlInit>, <urlPoll> and <urlNotify>.
	 */
	mxEditor.prototype.createSession = function ()
	{
		var session = null;
		var self = this; // closure
		
		// Routes any change events fro the session
		// through the editor and dispatches them as
		// a session event.
		var sessionChanged = function(session)
		{
			self.dispatchEvent('session', self, session);
		};
		session = this.connect(this.urlInit, this.urlPoll,
			this.urlNotify, sessionChanged);
		
		// Animates the remote changes when initially dispatched	
		session.addListener('dispatched', function(sender, changes)
		{
			if (changes.length < 10)
			{
				mxUtils.animateChanges(self.graph, changes);
			}
		});
		
		// Resets the command history after session initialization
		session.addListener('connect', function(sender, changes)
		{
			self.resetHistory();
		});
	};
	
	/**
	 * Function: configure
	 *
	 * Configures the editor using the specified node. To load the
	 * configuration from a given URL the following code can be used to obtain
	 * the XML node.
	 * 
	 * (code)
	 * var node = mxUtils.load(url).getDocumentElement();
	 * (end)
	 * 
	 * Parameters:
	 * 
	 * node - XML node that contains the configuration.
	 */
	mxEditor.prototype.configure = function (node)
	{
		if (node != null)
		{
			// Creates a decoder for the XML data
			// and uses it to configure the editor
			var dec = new mxCodec(node.ownerDocument);
			try
			{
				// Disables autosaving while the editor
				// is being configured
				this.isConfiguring = true;
				dec.decode(node, this);
			}
			finally
			{
				this.isConfiguring = null;
			}
			
			// Resets the counters, modified state and
			// command history
			this.resetHistory();
		}
	};

	/**
	 * Function: resetFirstTime
	 * 
	 * Resets the cookie that is used to remember if the editor has already
	 * been used.
	 */
	mxEditor.prototype.resetFirstTime = function ()
	{
		document.cookie =
			'mxgraph=seen; expires=Fri, 27 Jul 2001 02:47:11 UTC; path=/';
	};

	/**
	 * Function: resetHistory
	 * 
	 * Resets the command history, modified state and counters.
	 */
	mxEditor.prototype.resetHistory = function ()
	{
		this.lastSnapshot = new Date().getTime();
		this.undoManager.reset();
		this.ignoredChanges = 0;
		this.modified = false;
	};
	
	/**
	 * Function: addAction
	 * 
	 * Binds the specified actionname to the specified function.
	 * 
	 * Parameters:
	 * 
	 * actionname - String that specifies the name of the action
	 * to be added.
	 * funct - Function that implements the new action. The first
	 * argument of the function is the editor it is used
	 * with, the second argument is the cell it operates
	 * upon.
	 * 
	 * Example:
	 * (code)
	 * editor.addAction('test', function(editor, cell)
	 * {
	 * 		mxUtils.alert("test "+cell);
	 * });
	 * (end)
	 */
	mxEditor.prototype.addAction = function (actionname, funct)
	{
		this.actions[actionname] = funct;
	};

	/**
	 * Function: execute
	 * 
	 * Executes the function with the given name in <actions> passing the
	 * editor instance and given cell as the first and second argument. All
	 * additional arguments are passed to the action as well.
	 * 
	 * Example:
	 * 
	 * (code)
	 * editor.execute("showProperties", cell);
	 * (end)
	 */
	mxEditor.prototype.execute = function (actionname, cell)
	{
		var action = this.actions[actionname];
		
		if (action != null)
		{
			try
			{
				// Creates the array of arguments by replacing the actionname
				// with the editor instance in the args of this function
				var args = arguments;
				args[0] = this;
				
				// Invokes the function on the editor using the args
				action.apply(this, args);
			}
			catch (err)
			{
				mxUtils.error('Cannot execute ' + actionname +
					': '+err.message, 280, true);
				
				throw err;
			}
		}
		else
		{
			mxUtils.error('Cannot find action '+actionname, 280, true);
		}
	};

	/**
	 * Function: createGraph
	 * 
	 * Creates the <graph> for the editor. The graph is created with no
	 * container and is initialized from <setGraphContainer>.
	 */
	mxEditor.prototype.createGraph = function ()
	{
		var graph = new mxGraph(null, null, this.graphRenderHint);
		
		// Enables rubberband, tooltips, panning
		graph.setTooltips(true);
		graph.setPanning(true);

		// Overrides the dblclick method on the graph to
		// invoke the dblClickAction for a cell and reset
		// the selection tool in the toolbar
		this.installDblClickHandler(graph);
		
		// Overrides <mxGraph.resize> to implement mainting
		// swimlane heights/widths equal
		this.installResizeHandler(graph);
		
		// Installs the command history
		this.installUndoHandler(graph);

		// Installs the handlers for the root event
		this.installDrillHandler(graph);
		
		// Installs the handler for autosaving
		// and validation
		this.installChangeHandler(graph);
		
		// Installs the listeners for handling
		// addition of new swimlanes and apply
		// the cycle attribute
		this.installAddHandler(graph);
		
		// Overrides <mxGraph.getLayout> to implement autolayouts
		this.installLayoutHandler(graph);
		
		// Installs the handler for calling the
		// insert function and consume the
		// event if an insert function is defined
		this.installInsertHandler(graph);

		// Redirects the function for creating the
		// popupmenu items
		var self = this; // closure
		graph.panningHandler.factoryMethod = function(menu, cell, evt)
		{
			return self.createPopupMenu(menu, cell, evt);
		};

		// Redirects the function for creating
		// new connections in the diagram
		graph.connectionHandler.factoryMethod = function(source, target)
		{
			return self.createEdge(source, target)
		};

		return graph;
	};

	/**
	 * Function: setGraphContainer
	 * 
	 * Sets the graph's container using <mxGraph.init>.
	 */
	mxEditor.prototype.setGraphContainer = function (container)
	{
		if (this.graph.container == null)
		{
			// Creates the graph instance inside the given container and render hint
			//this.graph = new mxGraph(container, null, this.graphRenderHint);
			this.graph.init(container);

			// Install rubberband selection as the last
			// action handler in the chain
			this.rubberband = new mxRubberband(this.graph);

			// Disables the context menu
			if (this.disableContextMenu)
			{
				mxEvent.disableContextMenu(container);
			}

			// Workaround for stylesheet directives in IE
			if (mxClient.IS_IE)
			{
				new mxDivResizer(container);
			}
		}
	};

	/**
	 * Function: installAddHandler
	 * 
	 * Installs an event listener to maintain the width
	 * or height of new swimlanes.
	 */
	mxEditor.prototype.installAddHandler = function (graph)
	{
		var self = this; // closure
		var offset = 50;
		var listener = function(sender, cells)
		{
			for (var i=0; i<cells.length; i++)
			{
				// Updates the width or height of all
				// new swimlanes
				var cell = cells[i];
				
				if (self.maintainSwimlanes &&
					graph.isSwimlane(cell))
				{
					var model = graph.getModel();
					var geo = model.getGeometry(cell);
					
					// Gets the predefined width or height
					// and checks if the value allows an
					// update, that is, if it is null or 0
					var param = (self.horizontalFlow) ?
						geo.width : geo.height;

					if (param == null || param == 0)
					{
						// If the value needs an update, then
						// use the width or height of the container
						// as a default value.
						param = (self.horizontalFlow) ?
							graph.container.offsetWidth-10 :
							graph.container.offsetHeight;
						param -= offset;
					}
					
					// Checks if any existing swimlanes can be used
					// to determine the width or height
					var parent = graph.getDefaultParent();
					var childCount = model.getChildCount(parent);
					
					for (var i=0; i<childCount; i++)
					{
						var child = model.getChildAt(parent, i);
						geo = model.getGeometry(child);
						
						if (cell != child &&
							graph.isSwimlane(child))
						{
							// Uses the width or height of the existing
							// swimlane
							param = (self.horizontalFlow) ?
								geo.width : geo.height;
							break;
						}
					}
					
					// Sets the width or height of the new swimlane
					geo = model.getGeometry(cell);
					
					if (geo != null)
					{	
						if (self.horizontalFlow)
						{
							geo.width = param;
						}
						else
						{
							geo.height = param;
						}
					}
				}
			}
		};
		
		graph.addListener('add', listener);
	};
		
	/**
	 * Function: installDblClickHandler
	 * 
	 * Overrides <mxGraph.dblClick> to invoke <dblClickAction>
	 * on a cell and reset the selection tool in the toolbar.
	 */
	mxEditor.prototype.installDblClickHandler = function (graph)
	{
		var self = this; // closure
		graph.dblClick = function(evt, cell)
		{
			// Dispatches the dblclick event in the graph
			graph.dispatchEvent('dblclick', graph, evt, cell);
			
			// Invokes the dblclick action on the given cell
			if (cell != null && graph.isEnabled())
			{
				self.execute(self.dblClickAction, cell);
			}
		}
	};
			
	/**
	 * Function: installUndoHandler
	 * 
	 * Adds the <undoManager> to the graph model and the view.
	 */
	mxEditor.prototype.installUndoHandler = function (graph)
	{				
		var self = this; // closure
		var listener = function(sender, edit)
		{
			self.undoManager.undoableEditHappened(edit);
		};
		
		graph.getModel().addListener('undo', listener);
		graph.getView().addListener('undo', listener);
		
		// Keeps the selection state in sync
		listener = function(sender, edit)
		{
			graph.selectCellsForEdit(edit);
		};
		
		this.undoManager.addListener('undo', listener);
		this.undoManager.addListener('redo', listener);
	};
			
	/**
	 * Function: installDrillHandler
	 * 
	 * Installs listeners for dispatching the <root> event.
	 */
	mxEditor.prototype.installDrillHandler = function (graph)
	{				
		var self = this; // closure
		var listener = function(sender)
		{
			self.dispatchEvent('root', self);
		};
		
		graph.getView().addListener('down', listener);
		graph.getView().addListener('up', listener);
	};
	
	/**
	 * Function: installResizeHandler
	 * 
	 * Extends <mxGraph.resizeCells> to maintain the siblings of a resized
	 * swimlane, depending on <maintainSwimlanes>. The previous implementation
	 * of resizeCells is called with the modified arguments.
	 */
	mxEditor.prototype.installResizeHandler = function (graph)
	{
		var old = graph.resizeCells;
		
		var self = this; // closure
		graph.resizeCells = function(cells, boundsArray)
		{
			if (self.maintainSwimlanes)
			{
				var model = graph.getModel();
				var visited = new Array();
				var cellCount = cells.length;
	
				for (var i = 0; i < cellCount; i++)
				{
					// If the cell is a swimlane then checks if the editor
					// is setup to control the width or height of the other
					// swimlanes in the diagram.
					if (graph.isSwimlane(cells[i]))
					{
						var parent = model.getParent(cells[i]);
						var parentId = mxCellPath.create(parent);
						
						if (parent != null &&
							visited[parentId] == null)
						{
							visited[parentId] = parent;
							
							// Gets the geometry of the cell that has been
							// resized and works out which dimension to
							// copy to the other swimlanes
							var geo = model.getGeometry(cells[i]);
							var param = (self.horizontalFlow) ?
								boundsArray[i].width :
								boundsArray[i].height;
							
							var childCount = model.getChildCount(parent);
							
							for (var j = 0; j < childCount; j++)
							{
								var child = model.getChildAt(parent, j);
								
								if (graph.isSwimlane(child) &&
									child != cells[i])
								{
									// Creates a clone of the geometry
									// and updates the respective field
									geo = model.getGeometry(child);
									
									if (geo != null)
									{
										geo = geo.clone();
										
										if (self.horizontalFlow)
										{
											geo.width = param;
										}
										else
										{
											geo.height = param;
										}
										
										cells.push(child);
										boundsArray.push(geo);
									}
								}
							}
						}
					}
				}
			}

			old.apply(this, arguments);
		};
	};

	
	/**
	 * Function: installChangeHandler
	 * 
	 * Installs the listeners required to automatically validate
	 * the graph and do autosaving of the diagram. On each change,
	 * this implementation fires a <root> event.
	 */
	mxEditor.prototype.installChangeHandler = function (graph)
	{
		// TODO: Installs a callback method to implement
		// autosaving and maintains the modified flag.
		var self = this; // closure
		var listener = function(sender, changes)
		{
			// Updates the modified state
			self.modified = true;

			// Automatically validates the graph
			// after each change
			if (self.validating == true)
			{
				graph.validate();
			}
			
			// Automatically saves the changed graph
			// using the save function
			if (!this.isConfiguring)
			{
				if (self.autoSaving)
				{
					self.autosave(changes);
				}
			}
			
			// Checks if the root has been changed
			for (var i=0; i<changes.length; i++)
			{
				var change = changes[i];
				
				if (change.constructor == mxRootChange ||
					(change.constructor == mxValueChange &&
					change.cell == self.graph.model.root) ||
					(change.constructor == mxCellAttributeChange &&
					change.cell == self.graph.model.root))
				{
					self.dispatchEvent('root', self);
					break;
				}
			}
		};
		
		graph.getModel().addListener('change', listener);
	};
				
	/**
	 * Function: installLayoutHandler
	 * 
	 * Extends <mxGraph.getLayout> to invoke the locally defined inter- and
	 * intraswimlane layouts. If the previous implementation returns a layout
	 * then this is ignored, else, this returns <swimlaneLayout> for swimlanes
	 * and <diagramLayout> for top-level cells.
	 */
	mxEditor.prototype.installLayoutHandler = function (graph)
	{
		var old = graph.getLayout;
		
		var self = this; // closure
		graph.getLayout = function(cell)
		{
			var layout = old.apply(this, arguments);
			var model = this.getModel();
			
			if (layout == null &&
				model.getParent(cell) != null)
			{
				// Executes the swimlane layout if a child of
				// a swimlane has been changed. The layout is
				// lazy created in createSwimlaneLayout.
				if (self.layoutSwimlanes &&
					graph.isSwimlane(cell))
				{
					if (self.swimlaneLayout == null)
					{
						self.swimlaneLayout = self.createSwimlaneLayout();
					}
					
					layout = self.swimlaneLayout;
				}
				
				// Executes the diagram layout if the modified
				// cell is a top-level cell. The layout is
				// lazy created in createDiagramLayout.
				else if (self.layoutDiagram &&
					(graph.isValidRoot(cell) ||
					model.getParent(model.getParent(cell)) == null))
				{
					if (self.diagramLayout == null)
					{
						self.diagramLayout = self.createDiagramLayout();
					}
					
					layout = self.diagramLayout;
				}
			}
				
			return layout;
		};
	};
					
	/**
	 * Function: installInsertHandler
	 * 
	 * Installs the handler for invoking <insertFunction> if
	 * one is defined.
	 */
	mxEditor.prototype.installInsertHandler = function (graph)
	{
		var self = this;
		var insertHandler =
		{
			mouseDown: function(evt, cell, index)
			{
				if (self.insertFunction != null &&
					!mxEvent.isPopupTrigger(evt) &&
					(self.forcedInserting ||
					(cell == null && index == null)))
				{
					self.graph.clearSelection();
					self.insertFunction(evt, cell);

					// Consumes the rest of the events
					// for this gesture (down, move, up)
					this.isActive = true;
					mxEvent.consume(evt);
				}
			},
			
			mouseMove: function(evt, cell)
			{
				if (this.isActive)
				{
					mxEvent.consume(evt);
				}
			},
			
			mouseUp: function(evt, cell)
			{
				if (this.isActive)
				{
					this.isActive = false;
					mxEvent.consume(evt);
				}
			}
		};
		
		graph.addGraphListener(insertHandler);
	};

	/**
	 * Function: createDiagramLayout
	 * 
	 * Creates the layout instance used to layout the
	 * swimlanes in the diagram.
	 */
	mxEditor.prototype.createDiagramLayout = function ()
	{
		var gs = this.graph.gridSize;
		var layout = new mxStackLayout(this.graph, !this.horizontalFlow,
			 this.swimlaneSpacing, 2*gs, 2*gs);
 		
 		// Overrides isIgnored to only take into account swimlanes
 		layout.isVertexIgnored = function(cell)
 		{
 			return !layout.graph.isSwimlane(cell);
 		};
 		
 		return layout;
	};
	
	/**
	 * Function: createSwimlaneLayout
	 * 
	 * Creates the layout instance used to layout the
	 * children of each swimlane.
	 */
	mxEditor.prototype.createSwimlaneLayout = function ()
	{
		return new mxCompactTreeLayout(this.graph, this.horizontalFlow);
	};
	
	/**
	 * Function: createToolbar
	 * 
	 * Creates the <toolbar> with no container.
	 */
	mxEditor.prototype.createToolbar = function ()
	{
		return new mxDefaultToolbar(null, this);
	};
	
	/**
	 * Function: setToolbarContainer
	 * 
	 * Initializes the toolbar for the given container.
	 */
	mxEditor.prototype.setToolbarContainer = function (container)
	{
		this.toolbar.init(container);
		
		// Workaround for stylesheet directives in IE
		if (mxClient.IS_IE)
		{
			new mxDivResizer(container);
		}
	};
	
	/**
	 * Function: setStatusContainer
	 * 
	 * Creates the <status> using the specified container.
	 * 
	 * This implementation adds listeners in the editor to 
	 * display the last saved time and the current filename 
	 * in the status bar.
	 * 
	 * Parameters:
	 * 
	 * container - DOM node that will contain the statusbar.
	 */
	mxEditor.prototype.setStatusContainer = function (container)
	{
		if (this.status == null)
		{
			this.status = container;
			
			// Prints the last saved time in the status bar
			// when files are saved
			var self = this; // closure
			this.addListener('save', function(sender)
			{
				var tstamp = new Date().toLocaleString();
				self.setStatus((mxResources.get(self.lastSavedResource) ||
					self.lastSavedResource)+': '+tstamp);
			});
			
			// Updates the statusbar to display the filename
			// when new files are opened
			this.addListener('open', function(sender)
			{
				self.setStatus((mxResources.get(self.currentFileResource) ||
					self.currentFileResource)+': '+self.filename);
			});
			
			// Workaround for stylesheet directives in IE
			if (mxClient.IS_IE)
			{
				new mxDivResizer(container);
			}
		}
	};
	
	/**
	 * Function: setStatus
	 * 
	 * Display the specified message in the status bar.
	 * 
	 * Parameters:
	 * 
	 * message - String the specified the message to
	 * be displayed.
	 */
	mxEditor.prototype.setStatus = function (message)
	{
		if (this.status != null && message != null)
		{
			this.status.innerHTML = message;
		}
	};

	/**
	 * Function: setTitleContainer
	 * 
	 * Creates a listener to update the inner HTML of the
	 * specified DOM node with the value of <getTitle>.
	 * 
	 * Parameters:
	 * 
	 * container - DOM node that will contain the title.
	 */
	mxEditor.prototype.setTitleContainer = function (container)
	{
		var self = this; // closure
		this.addListener('root', function(sender)
		{
			container.innerHTML = self.getTitle();
		});

		// Workaround for stylesheet directives in IE
		if (mxClient.IS_IE)
		{
			new mxDivResizer(container);
		}
	};
	
	/**
	 * Function: treeLayout
	 * 
	 * Executes a vertical or horizontal compact tree layout
	 * using the specified cell as an argument. The cell may
	 * either be a group or the root of a tree.
	 * 
	 * Parameters:
	 * 
	 * cell - <mxCell> to use in the compact tree layout.
	 * horizontal - Optional boolean to specify the tree's
	 * orientation. Default is true.
	 */
	mxEditor.prototype.treeLayout = function (cell, horizontal)
	{
		if (cell != null)
		{
			var layout = new mxCompactTreeLayout(this.graph, horizontal);
			layout.execute(cell);
		}
	};

	/**
	 * Function: getTitle
	 * 
	 * Returns the string value for the current root of the
	 * diagram.
	 */
	mxEditor.prototype.getTitle = function ()
	{
		var title = '';
		var graph = this.graph;
		var cell = graph.getCurrentRoot();
		
		while (cell != null &&
			   graph.getModel().getParent(
					graph.getModel().getParent(cell)) != null)
		{
			// Append each label of a valid root
			if (graph.isValidRoot(cell))
			{
				title = ' > ' +
				graph.convertValueToString(cell) + title;
			}
			
			cell = graph.getModel().getParent(cell);
		}
		
		var prefix = this.getRootTitle();
		
		return prefix + title;
	};

	/**
	 * Function: getRootTitle
	 * 
	 * Returns the string value of the root cell in
	 * <mxGraph.model>.
	 */
	mxEditor.prototype.getRootTitle = function ()
	{
		var root = this.graph.getModel().getRoot();
		return this.graph.convertValueToString(root);
	};

	/**
	 * Function: undo
	 * 
	 * Undo the last change in <graph>.
	 */
	mxEditor.prototype.undo = function ()
	{
		this.undoManager.undo();
	};

	/**
	 * Function: redo
	 * 
	 * Redo the last change in <graph>.
	 */
	mxEditor.prototype.redo = function ()
	{
		this.undoManager.redo();
	};

	/**
	 * Function: group
	 * 
	 * Invokes <createGroup> to create a new group cell
	 * and the invokes <mxGraph.group>, using the grid size
	 * of the graph as the spacing in the group's content
	 * area.
	 */
	mxEditor.prototype.group = function ()
	{
		var border = (this.groupBorderSize != null) ?
			this.groupBorderSize :
			this.graph.gridSize;
		this.graph.group(this.createGroup(), border);
	};

	/**
	 * Function: createGroup
	 * 
	 * Creates and returns a clone of <defaultGroup> to be used
	 * as a new group cell in <group>.
	 */
	mxEditor.prototype.createGroup = function ()
	{
		var model = this.graph.getModel();
		
		return model.cloneCell(this.defaultGroup);
	};
	
	/**
	 * Function: open
	 * 
	 * Opens the specified file synchronously and parses it
	 * using <readGraphModel>. It updates <filename>
	 * and fires an <open>-event.
	 * 
	 * Parameters:
	 * 
	 * filename - URL of the file to be opened.
	 */
	mxEditor.prototype.open = function (filename)
	{
		if (filename != null)
		{
			this.dispatchEvent('beforeOpen', this, filename);
			var e = null;
			
			try
			{
				var xml = mxUtils.load(filename).getXml();
				this.readGraphModel(xml.documentElement);
				this.filename = filename;
				
				this.dispatchEvent('open', this, filename);
			}
			catch (ex)
			{
				mxUtils.error('Cannot open '+filename+': '+ex.message, 280, true);
				e = ex;
			}
			
			this.dispatchEvent('afterOpen', this, filename, e);
		}
	};
	
	/**
	 * Function: readGraphModel
	 * 
	 * Reads the specified XML node into the existing graph model
	 * and resets the command history and modified state, as well
	 * as the autosave counters.
	 */
	mxEditor.prototype.readGraphModel = function (node)
	{
		var dec = new mxCodec(node.ownerDocument);
		dec.decode(node, this.graph.getModel());
		this.resetHistory();
	};

	/**
	 * Function: save
	 * 
	 * Posts the string returned by <writeGraphModel> to the given
	 * URL or the URL returned by <getUrlPost>. The actual posting
	 * is carried out by <postDiagram>. If the URL is null then
	 * the resulting XML will be displayed using
	 * <mxUtils.popup>.
	 */
	mxEditor.prototype.save = function (isAutomatic, linefeed, url)
	{
		if (isAutomatic == null || isAutomatic == this.autoSaving)
		{
			this.dispatchEvent('beforeSave', this, isAutomatic);
			
			// Resets the autosave counters
			this.lastSnapshot = new Date().getTime();
			this.ignoredChanges = 0;
			this.modified = false;
			var e = null;
			
			try
			{
				// Gets the URL to post the data to
				url = url || this.getUrlPost(isAutomatic);

				// Posts the data if the URL is not empty
				if (url != null && url.length > 0)
				{
					var data = this.writeGraphModel();
					this.postDiagram(url, data);
				}
				
				// Displays the data in a popup window
				else if (!isAutomatic)
				{
				
					// Creates an XML representation of the
					// graph model
					var enc = new mxCodec();
					var node = enc.encode(this.graph.getModel());
					var xml = mxUtils.getPrettyXml(node);
					mxUtils.popup(xml);
				}
				
				// Dispatches a save event
				this.dispatchEvent('save', this, isAutomatic, url);
			}
			catch (ex)
			{
				e = ex;
			}
			
			this.dispatchEvent('afterSave', this, isAutomatic, e);
		}
	};

	/**
	 * Function: postDiagram
	 * 
	 * Hook for subclassers to override the posting of a diagram
	 * represented by the given node to the given URL. This fires
	 * an asynchronous <post> event if the diagram has been posted.
	 * 
	 * Example:
	 * 
	 * To replace the diagram with the diagram in the response, use the
	 * following code.
	 * 
	 * (code)
	 * editor.addListener('post', function(sender, req, url, data)
	 * {
	 *   // Process response (replace diagram)
	 *   var root = req.getDocumentElement();
	 *   editor.graph.readGraphModel(root)
	 * });
	 * (end)
	 */
	mxEditor.prototype.postDiagram = function (url, data)
	{
		if (this.escapePostData)
		{
			data = encodeURIComponent(data);
		}
		
		var self = this; // closure
		mxUtils.post(url, this.postParameterName+'='+data,
			function(req)
			{
				self.dispatchEvent('post', self, req, url, data);
			}
		);
	};

	/**
	 * Function: writeGraphModel
	 * 
	 * Hook to create the string representation of the diagram. The default
	 * implementation uses an <mxCodec> to encode the graph model as
	 * follows:
	 * 
	 * (code)
	 * var enc = new mxCodec();
	 * var node = enc.encode(this.graph.getModel());
	 * return mxUtils.getXml(node, this.linefeed);
	 * (end)
	 */
	mxEditor.prototype.writeGraphModel = function ()
	{
		var enc = new mxCodec();
		var node = enc.encode(this.graph.getModel());
		return mxUtils.getXml(node, this.linefeed);
	}
	
	/**
	 * Function: getUrlPost
	 * 
	 * Returns the URL to post the diagram to. This is used
	 * in <save>. The default implementation returns <urlPost>,
	 * adding <code>?draft=true</code>.
	 */
	mxEditor.prototype.getUrlPost = function (isAutomatic)
	{
		var url = this.urlPost;
		if (url != null && url.length > 0)
		{
			if (isAutomatic)
			{
				url += '?draft=true';
			}
		}
		return url;
	};
	
	/**
	 * Function: getUrlImage
	 * 
	 * Returns the URL to create the image with. This is typically
	 * the URL of a backend which accepts an XML representation
	 * of a graph view to create an image. The function is used
	 * in the image action to create an image. This implementation
	 * returns <urlImage>.
	 */
	mxEditor.prototype.getUrlImage = function ()
	{
		return this.urlImage;
	};

	/**
	 * Function: autosave
	 * 
	 * Saves no more than every <autoSaveDelay> seconds unless
	 * there have been more than <autoSaveThreshold> transactions and
	 * saves not more often than every <autoSaveThrottle> seconds.
	 */
	mxEditor.prototype.autosave = function (changes)
	{
		var now = new Date().getTime();
		var dt = (now-this.lastSnapshot)/1000;
		if (dt > this.autoSaveDelay ||
			(this.ignoredChanges >= this.autoSaveThreshold &&
			 dt > this.autoSaveThrottle))
		{
			this.lastSnapshot = now;
			this.ignoredChanges = 1;
			this.save(true);
		}
		else
		{
			// Increments the number of ignored changes
			this.ignoredChanges++;
		}
	};
	
	/**
	 * Function: connect
	 * 
	 * Creates and returns a session for the specified parameters, installing
	 * the onChange function as a change listener for the session.
	 */
	mxEditor.prototype.connect = function (urlInit, urlPoll, urlNotify, onChange)
	{
		var session = null;
		if (!mxClient.IS_LOCAL)
		{
			var session = new mxSession(this.graph.getModel(),
				urlInit, urlPoll, urlNotify);

			// Handles the model state on editor level. There should
			// be default code in the session to be overridden with
			// this editor-level handling of the packet.
			var self = this;
			session.addListener('receive', function(sender, node)
			{
				if (node.nodeName == 'mxGraphModel')
				{
					self.readGraphModel(node);
				}
			});
			
			// Installs the listener for all events
			// that signal a change of the session
			session.addListener('disconnect', onChange);
			session.addListener('connect', onChange);
			session.addListener('notify', onChange);
			session.addListener('get', onChange);
			session.start();
		}
		return session;
	};

	/**
	 * Function: swapStyles
	 * 
	 * Swaps the styles for the given names in the graph's
	 * stylesheet and refreshes the graph.
	 */
	mxEditor.prototype.swapStyles = function (first, second)
	{
		var style = this.graph.getStylesheet().styles[second];
		this.graph.getView().getStylesheet().putCellStyle(
			second, this.graph.getStylesheet().styles[first]);
		this.graph.getStylesheet().putCellStyle(first, style);
		this.graph.refresh();
	};
	
	/**
	 * Function: showProperties
	 * 
	 * Creates and shows the properties dialog for the given
	 * cell. The content area of the dialog is created using
	 * <createProperties>.
	 */
	mxEditor.prototype.showProperties = function (cell)
	{
		cell = cell || this.graph.getSelectionCell();
		
		// Uses the root node for the properties dialog
		// if not cell was passed in and no cell is
		// selected
		if (cell == null)
		{
			cell = this.graph.getCurrentRoot();
			if (cell == null)
			{
				cell = this.graph.getModel().getRoot();
			}
		}
		
		if (cell != null)
		{
			// Makes sure there is no in-place editor in the
			// graph and computes the location of the dialog
			this.graph.editor.stopEditing(true);

			var offset = mxUtils.getOffset(this.graph.container);
			var x = offset.x+10;
			var y = offset.y;
			
			// Avoids moving the dialog if it is alredy open
			if (this.properties != null &&
				!this.movePropertiesDialog)
			{
				x = this.properties.getX();
				y = this.properties.getY();
			}
			
			// Places the dialog near the cell for which it
			// displays the properties
			else
			{
				var bounds = this.graph.getCellBounds(cell);
				if (bounds != null)
				{
					x += bounds.x+Math.min(200, bounds.width);
					y += bounds.y;				
				}			
			}
			
			// Hides the existing properties dialog and creates
			// a new one with the contents created in the hook
			// method
			this.hideProperties();
			var node = this.createProperties(cell);
			
			if (node != null)
			{
				// Displays the contents in a window and stores a
				// reference to the window for later hiding of
				// the window
				this.properties = new mxWindow(
					mxResources.get(this.propertiesResource) ||
					this.propertiesResource,
					node, x, y, this.propertiesWidth,
					this.propertiesHeight, false);
				this.properties.setVisible(true);
			}
		}
	};

	/**
	 * Function: isPropertiesVisible
	 * 
	 * Returns true if the properties dialog is currently visible.
	 */
	mxEditor.prototype.isPropertiesVisible = function ()
	{
		return this.properties != null;
	};

	/**
	 * Function: createProperties
	 * 
	 * Creates and returns the DOM node that represents the contents
	 * of the properties dialog for the given cell. This implementation
	 * works for user objects that are XML nodes and display all the
	 * node attributes in a form.
	 */
	mxEditor.prototype.createProperties = function (cell)
	{
		var model = this.graph.getModel();
		var value = model.getValue(cell);
		
		if (mxUtils.isNode(value))
		{
			// Creates a form for the user object inside
			// the cell
			var form = new mxForm('properties');
			
			// Adds a readonly field for the cell id
			var id = form.addText('ID', cell.getId());
			id.setAttribute('readonly', 'true');

			var geo = null;
			var yField = null;
			var xField = null;
			var widthField = null;
			var heightField = null;

			// Adds fields for the location and size
			if (model.isVertex(cell))
			{
				geo = model.getGeometry(cell);
				
				if (geo != null)
				{
					yField = form.addText('top', geo.y);
					xField = form.addText('left', geo.x);
					widthField = form.addText('width', geo.width);
					heightField = form.addText('height', geo.height);
				}
			}
			
			// Adds a field for the cell style			
			var tmp = model.getStyle(cell);
			var style = form.addText('Style', tmp || '');
			
			// Creates textareas for each attribute of the
			// user object within the cell
			var attrs = value.attributes;
			var texts = new Array();
			
			for (var i=0; i<attrs.length; i++)
			{
				// Creates a textarea with more lines for
				// the cell label
				var val = attrs[i].nodeValue;
				texts[i] = form.addTextarea(attrs[i].nodeName, val,
					(attrs[i].nodeName == 'label') ? 4 : 2);
			}
			
			// Adds an OK and Cancel button to the dialog
			// contents and implements the respective
			// actions below
			var self = this; // closure
			
			// Defines the function to be executed when the
			// OK button is pressed in the dialog
			var okFunction = function()
			{
				// Hides the dialog
				self.hideProperties();
				
				// Supports undo for the changes on the underlying
				// XML structure / XML node attribute changes.
				model.beginUpdate();
				try
				{
					if (geo != null)
					{
						geo = geo.clone();
						
						geo.x = parseFloat(xField.value);
						geo.y = parseFloat(yField.value);
						geo.width = parseFloat(widthField.value);
						geo.height = parseFloat(heightField.value);
						
						model.setGeometry(cell, geo);
					}
					
					// Applies the style
					if (style.value.length > 0)
					{
						model.setStyle(cell, style.value);
					}
					else
					{
						model.setStyle(cell, null);
					}
					
					// Creates an undoable change for each
					// attribute and executes it using the
					// model, which will also make the change
					// part of the current transaction
					for (var i=0; i<attrs.length; i++)
					{
						var edit = new mxCellAttributeChange(
							cell, attrs[i].nodeName,
							texts[i].value);
						model.execute(edit);
					}
					
					// Checks if the graph wants cells to 
					// be automatically sized and updates
					// the size as an undoable step if
					// the feature is enabled
					if (self.graph.isUpdateSize(cell))
					{
						self.graph.updateSize(cell);
					}
				}
				finally
				{
					model.endUpdate();
				}
			}
			
			// Defines the function to be executed when the
			// Cancel button is pressed in the dialog
			var cancelFunction = function()
			{
				// Hides the dialog
				self.hideProperties();
			}
			
			form.addButtons(okFunction, cancelFunction);
			
			return form.table;
		}

		return null;
	};

	/**
	 * Function: hideProperties
	 * 
	 * Hides the properties dialog.
	 */
	mxEditor.prototype.hideProperties = function ()
	{
		if (this.properties != null)
		{
			this.properties.destroy();
			this.properties = null;
		}
	};

	/**
	 * Function: showTasks
	 * 
	 * Shows the tasks window. The tasks window is created
	 * using <createTasks>.
	 */
	mxEditor.prototype.showTasks = function (tasks)
	{
		if (this.tasks == null)
		{
			var div = document.createElement('div');
			div.style.padding = '4px';
			div.style.paddingLeft = '20px';
			var w = document.body.clientWidth;
			var wnd = new mxWindow(
				mxResources.get(this.tasksResource) ||
				this.tasksResource,
				div, w-220, this.tasksTop, 200);
			wnd.setClosable(true);
			wnd.destroyOnClose = false;
			
			// Installs a function to update the contents
			// of the tasks window on every change of the
			// model, selection or root.
			var self = this; // closure
			var funct = function(sender)
			{
				mxUtils.release(div);
				div.innerHTML = '';
				self.createTasks(div);
			};
			
			this.graph.getModel().addListener('change', funct);
			this.graph.selection.addListener('change', funct);
			this.graph.addListener('root', funct);
			
			// Assigns the icon to the tasks window
			if (this.tasksWindowImage != null)
			{
				wnd.setImage(this.tasksWindowImage);
			}
			
			this.tasks = wnd;
			this.createTasks(div);
		}
		
		this.tasks.setVisible(true);
	};
			
	/**
	 * Function: refreshTasks
	 * 
	 * Updates the contents of the tasks window using <createTasks>.
	 */
	mxEditor.prototype.refreshTasks = function (div)
	{
		if (this.tasks != null)
		{
			var div = this.tasks.content;
			mxUtils.release(div);
			div.innerHTML = '';
			this.createTasks(div);
		}
	};
			
	/**
	 * Function: createTasks
	 * 
	 * Updates the contents of the given DOM node to
	 * display the tasks associated with the current
	 * editor state. This is invoked whenever there
	 * is a possible change of state in the editor.
	 * Default implementation is empty.
	 */
	mxEditor.prototype.createTasks = function (div)
	{
		// override
	}
		
	/**
	 * Function: showHelp
	 * 
	 * Shows the help window. If the help window does not exist
	 * then it is created using an iframe pointing to the resource
	 * for the <code>urlHelp</code> key or <urlHelp> if the resource
	 * is undefined.
	 */
	mxEditor.prototype.showHelp = function (tasks)
	{
		if (this.help == null)
		{
			var frame = document.createElement('iframe');
			frame.setAttribute('src', mxResources.get('urlHelp') || this.urlHelp);
			frame.setAttribute('height', '100%');
			frame.setAttribute('width', '100%');
			frame.setAttribute('frameborder', '0');
			frame.style.backgroundColor = 'white';
		
			var w = document.body.clientWidth;
			var h = (document.body.clientHeight || document.documentElement.clientHeight);
			
			var wnd = new mxWindow(mxResources.get(this.helpResource) || this.helpResource,
				frame, (w-this.helpWidth)/2, (h-this.helpHeight)/3, this.helpWidth, this.helpHeight);
			wnd.setMaximizable(true);
			wnd.setClosable(true);
			wnd.destroyOnClose = false;
			wnd.setSizable(true);

			// Assigns the icon to the help window
			if (this.helpWindowImage != null)
			{
				wnd.setImage(this.helpWindowImage);
			}
			
			// Workaround for ignored iframe height 100% in FF
			if (mxClient.IS_NS)
			{
				var handler = function(sender)
				{
					var h = wnd.div.offsetHeight;
					frame.setAttribute('height', (h-26)+'px');
				};
				
				wnd.addListener('resize', handler);
				wnd.addListener('maximize', handler);
				wnd.addListener('normalize', handler);
				wnd.addListener('show', handler);
			}
			
			this.help = wnd;
		}
		this.help.setVisible(true);
	};

	/**
	 * Function: showOutline
	 * 
	 * Shows the outline window. If the window does not exist, then it is
	 * created using an <mxOutline>.
	 */
	mxEditor.prototype.showOutline = function ()
	{
		var create = this.outline == null;
		
		if (create)
		{
			var div = document.createElement('div');
			div.style.width = "100%";
			div.style.height = "100%";
			div.style.background = 'white';
			
			var wnd = new mxWindow(
				mxResources.get(this.outlineResource) ||
				this.outlineResource,
				div, 600, 480, 200, 200, false);
					
			// Creates the outline in the specified div
			// and links it to the existing graph
			var outline = new mxOutline(this.graph, div);			
			wnd.setClosable(true);
			wnd.setSizable(true);
			wnd.destroyOnClose = false;
			
			wnd.addListener('resizeend', function()
			{
				outline.update();
			});
			
			this.outline = wnd;
			this.outline.outline = outline;
		}
		
		// Finally shows the outline
		this.outline.setVisible(true);
		this.outline.outline.refresh();
	};
			
	/**
	 * Function: setMode
	 *
	 * Puts the graph into the specified mode. The following modenames are
	 * supported:
	 * 
	 * select - Selects using the left mouse button, new connections
	 * are disabled.
	 * connect - Selects using the left mouse button or creates new
	 * connections if mouse over cell hotspot. See <mxConnectionHandler>.
	 * pan - Pans using the left mouse button, new connections are disabled.
	 */
	mxEditor.prototype.setMode = function(modename)
	{
		if (modename == 'select')
		{
			this.graph.panningHandler.useLeftButtonForPanning = false;
			this.graph.connectionHandler.setEnabled(false);
		}
		else if (modename == 'connect')
		{
			this.graph.panningHandler.useLeftButtonForPanning = false;
			this.graph.connectionHandler.setEnabled(true);
		}
		else if (modename == 'pan')
		{
			this.graph.panningHandler.useLeftButtonForPanning = true;
			this.graph.connectionHandler.setEnabled(false);
		}
	};
	
	/**
	 * Function: createPopupMenu
	 * 
	 * Uses <popupHandler> to create the menu in the graph's
	 * panning handler. The redirection is setup in
	 * <setToolbarContainer>.
	 */
	mxEditor.prototype.createPopupMenu = function (menu, cell, evt)
	{
		this.popupHandler.createMenu(this, menu, cell, evt);
	};

	/**
	 * Function: createEdge
	 * 
	 * Uses <defaultEdge> as the prototype for creating new edges
	 * in the connection handler of the graph. The style of the
	 * edge will be overridden with the value returned by
	 * <getEdgeStyle>.
	 */
	mxEditor.prototype.createEdge = function (source, target)
	{
		// Clones the defaultedge prototype
		var e = null;
		
		if (this.defaultEdge != null)
		{
			var model = this.graph.getModel();
			e = model.cloneCell(this.defaultEdge);
		}
		else
		{
			e = new mxCell('');
			e.setEdge(true);
			
			var geo = new mxGeometry();
			geo.relative = true;
			e.setGeometry(geo);
		}
		
		// Overrides the edge style
		var style = this.getEdgeStyle();
		
		if (style != null)
		{
			e.setStyle(style);
		}
		
		return e;
	};

	/**
	 * Function: getEdgeStyle
	 * 
	 * Returns a string identifying the style of new edges.
	 * The function is used in <createEdge> when new edges
	 * are created in the graph.
	 */
	mxEditor.prototype.getEdgeStyle = function ()
	{
		return this.defaultEdgeStyle;
	}
	
	/**
	 * Function: consumeCycleAttribute
	 * 
	 * Returns the next attribute in <cycleAttributeValues>
	 * or null, if not attribute should be used in the
	 * specified cell.
	 */
	mxEditor.prototype.consumeCycleAttribute = function (cell)
	{
		return (this.cycleAttributeValues != null &&
			this.cycleAttributeValues.length > 0 &&
			this.graph.isSwimlane(cell)) ?
			this.cycleAttributeValues[this.cycleAttributeIndex++ %
				this.cycleAttributeValues.length] : null;
	};
	
	/**
	 * Function: cycleAttribute
	 * 
	 * Uses the returned value from <consumeCycleAttribute>
	 * as the value for the <cycleAttributeName> key in
	 * the given cell's style.
	 */
	mxEditor.prototype.cycleAttribute = function (cell)
	{
		if (this.cycleAttributeName != null)
		{
			var value = this.consumeCycleAttribute(cell);
			
			if (value != null)
			{
				cell.setStyle(cell.getStyle()+';'+
					this.cycleAttributeName+'='+value);
			}
		}
	};
	
	/**
	 * Function: addVertex
	 * 
	 * Adds the given vertex as a child of parent at the specified
	 * x and y coordinate and fires an <addVertex> event.
	 */
	mxEditor.prototype.addVertex = function (parent, vertex, x, y)
	{
		var model = this.graph.getModel();
		
		while (parent != null && !this.graph.isValidDropTarget(parent))
		{
			parent = model.getParent(parent);
		}
		
		parent = (parent != null) ? parent : this.graph.getSwimlaneAt(x, y);
		var scale = this.graph.getView().scale;
		
		var geo = model.getGeometry(vertex);
		var pgeo = model.getGeometry(parent);
		
		if (this.graph.isSwimlane(vertex) &&
			!this.graph.swimlaneNesting)
		{
			parent = null;
		}
		else if (parent == null && this.swimlaneRequired)
		{
			return null;
		}
		else if (parent != null && pgeo != null)
		{
			// Keeps vertex inside parent
			var state = this.graph.getView().getState(parent);
			
			if (state != null)
			{			
				x -= state.origin.x * scale;
				y -= state.origin.y * scale;
				
				if (this.graph.isConstrainedMoving)
				{
					var width = geo.width;
					var height = geo.height;				
					var tmp = state.x+state.width;
					
					if (x+width > tmp)
					{
						x -= x+width - tmp;
					}
					
					tmp = state.y+state.height;
					
					if (y+height > tmp)
					{
						y -= y+height - tmp;
					}
				}
			}
			else if (pgeo != null)
			{
				x -= pgeo.x*scale;
				y -= pgeo.y*scale;
			}
		}
		
		geo = geo.clone();
		geo.x = this.graph.snap(x / scale -
			this.graph.getView().translate.x -
			this.graph.gridSize/2);
		geo.y = this.graph.snap(y / scale -
			this.graph.getView().translate.y -
			this.graph.gridSize/2);
		vertex.setGeometry(geo);
		
		if (parent == null)
		{
			parent = this.graph.getDefaultParent();
		}

		this.cycleAttribute(vertex);
		this.dispatchEvent('beforeAddVertex', this, vertex, parent);

		model.beginUpdate();
		try
		{
			vertex = this.graph.addCell(vertex, parent);
			
			if (vertex != null)
			{
				this.graph.keepInside([vertex]);
				
				// Extends the parent if the child is larger
				if (this.extendParentOnAddVertex)
				{
					this.graph.extendParent(vertex);
				}
				
				this.dispatchEvent('addVertex', this, vertex);
			}
		}
		finally
		{
			model.endUpdate();
		}
		
		if (vertex != null)
		{
			this.graph.setSelectionCell(vertex);
			this.graph.scrollCellToVisible(vertex);
			this.dispatchEvent('afterAddVertex', this, vertex);
		}
		
		return vertex;
	};
	
	/**
	 * Function: destroy
	 * 
	 * Removes the editor and all its associated resources. This does not
	 * normally need to be called, it is called automatically when the window
	 * unloads.
	 */
	mxEditor.prototype.destroy = function ()
	{
		if (!this.destroyed)
		{
			this.destroyed = true;

			if (this.tasks != null)
			{
				this.tasks.destroy();
			}
			
			if (this.outline != null)
			{
				this.outline.destroy();
			}
			
			if (this.properties != null)
			{
				this.properties.destroy();
			}
			
			if (this.keyHandler != null)
			{
				this.keyHandler.destroy();
			}
			
			if (this.rubberband != null)
			{
				this.rubberband.destroy();
			}
			
			if (this.toolbar != null)
			{
				this.toolbar.destroy();
			}
			
			if (this.graph != null)
			{
				this.graph.destroy();
			}
		
			this.status = null;
			this.templates = null;
		}
	};

}
