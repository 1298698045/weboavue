/**
 * $Id: mxMedianHybridCrossingReduction.js,v 1.15 2008/10/08 18:35:02 gaudenz Exp $
 * Copyright (c) 2006, Gaudenz Alder
 *
 * Class: mxMedianHybridCrossingReduction
 * 
 * Sets the horizontal locations of node and edge dummy nodes on each layer.
 * Uses median down and up weighings as well heuristic to straighten edges as
 * far as possible.
 */
{

	/**
	 * Constructor: mxMedianHybridCrossingReduction
	 *
	 * Creates a coordinate assignment.
	 * 
	 * Arguments:
	 * 
	 * intraCellSpacing - the minimum buffer between cells on the same rank
	 * interRankCellSpacing - the minimum distance between cells on adjacent ranks
	 * orientation - the position of the root node(s) relative to the graph
	 * initialX - the leftmost coordinate node placement starts at
	 */
	function mxMedianHybridCrossingReduction(layout)
	{
		this.layout = layout;
	};

	/**
	 * Extends mxMedianHybridCrossingReduction.
	 */
	mxMedianHybridCrossingReduction.prototype = new mxHierarchicalLayoutStage();
	mxMedianHybridCrossingReduction.prototype.constructor = mxMedianHybridCrossingReduction;

	/**
	 * Variable: layout
	 * 
	 * Reference to the enclosing <mxHierarchicalLayout>.
	 */
	mxMedianHybridCrossingReduction.prototype.layout = null;

	/**
	 * Variable: maxIterations
	 * 
	 * The maximum number of iterations to perform whilst reducing edge
	 * crossings. Default is 24.
	 */
	mxMedianHybridCrossingReduction.prototype.maxIterations = 24;

	/**
	 * Variable: nestedBestRanks
	 * 
	 * Stores each rank as a collection of cells in the best order found for
	 * each layer so far
	 */
	mxMedianHybridCrossingReduction.prototype.nestedBestRanks = null;

	/**
	 * Variable: currentBestCrossings
	 * 
	 * The total number of crossings found in the best configuration so far
	 */
	mxMedianHybridCrossingReduction.prototype.currentBestCrossings = 0;

	/**
	 * Variable: iterationsWithoutImprovement
	 * 
	 * The total number of crossings found in the best configuration so far
	 */
	mxMedianHybridCrossingReduction.prototype.iterationsWithoutImprovement = 0;

	/**
	 * Variable: maxNoImprovementIterations
	 * 
	 * The total number of crossings found in the best configuration so far
	 */
	mxMedianHybridCrossingReduction.prototype.maxNoImprovementIterations = 2;

	/**
	 * Function: execute
	 * 
	 * Performs a vertex ordering within ranks as described by Gansner et al
	 * 1993
	 */
	mxMedianHybridCrossingReduction.prototype.execute = function(parent)
	{
		var model = this.layout.getModel();

		// Stores initial ordering as being the best one found so far
		this.nestedBestRanks = new Array();
		
		for (var i = 0; i < model.ranks.length; i++)
		{
			this.nestedBestRanks[i] = model.ranks[i].slice();
		}

		var iterationsWithoutImprovement = 0;
		var currentBestCrossings = this.calculateCrossings(model);

		for (var i = 0; i < this.maxIterations &&
			iterationsWithoutImprovement < this.maxNoImprovementIterations; i++)
		{
			this.weightedMedian(i, model);
			this.transpose(i, model);
			var candidateCrossings = this.calculateCrossings(model);

			if (candidateCrossings < currentBestCrossings)
			{
				currentBestCrossings = candidateCrossings;
				iterationsWithoutImprovement = 0;

				// Store the current rankings as the best ones
				for (var j = 0; j < this.nestedBestRanks.length; j++)
				{
					var rank = model.ranks[j];

					for (var key in rank)
					{
						var cell = rank[key];
						this.nestedBestRanks[j][cell.getGeneralPurposeVariable(j)] = cell;
					}
				}
			}
			else
			{
				// Increase count of iterations where we haven't improved the
				// layout
				iterationsWithoutImprovement++;

				// Restore the best values to the cells
				for (var j = 0; j < this.nestedBestRanks.length; j++)
				{
					var rank = model.ranks[j];
					
					for (var k = 0; k < rank.length; k++)
					{
						var cell = rank[k];
						cell.setGeneralPurposeVariable(j, key);
					}
				}
			}
			
			if (currentBestCrossings == 0)
			{
				// Do nothing further
				break;
			}
		}

		// Store the best rankings but in the model
		var ranks = new Array();
		var rankList = new Array();

		for (var i = 0; i < model.maxRank + 1; i++)
		{
			rankList[i] = new Array();
			ranks[i] = rankList[i];
		}

		for (var i = 0; i < this.nestedBestRanks.length; i++)
		{
			for (var j = 0; j < this.nestedBestRanks[i].length; j++)
			{
				rankList[i].push(this.nestedBestRanks[i][j]);
			}
		}

		model.ranks = ranks;
	};


	/**
	 * Function: calculateCrossings
	 * 
	 * Calculates the total number of edge crossing in the current graph.
	 * Returns the current number of edge crossings in the hierarchy graph
	 * model in the current candidate layout
	 * 
	 * Parameters:
	 * 
	 * model - the internal model describing the hierarchy
	 */
	mxMedianHybridCrossingReduction.prototype.calculateCrossings = function(model)
	{
		var numRanks = model.ranks.length;
		var totalCrossings = 0;

		for (var i = 1; i < numRanks; i++)
		{
			totalCrossings += this.calculateRankCrossing(i, model);
		}
		
		return totalCrossings;
	};

	/**
	 * Function: calculateRankCrossing
	 * 
	 * Calculates the number of edges crossings between the specified rank and
	 * the rank below it. Returns the number of edges crossings with the rank
	 * beneath
	 * 
	 * Parameters:
	 * 
	 * i -  the topmost rank of the pair ( higher rank value )
	 * model - the internal model describing the hierarchy
	 */
	mxMedianHybridCrossingReduction.prototype.calculateRankCrossing = function(i, model)
	{
		var totalCrossings = 0;
		var rank = model.ranks[i];
		var previousRank = model.ranks[i - 1];

		// Create an array of connections between these two levels
		var currentRankSize = rank.length;
		var previousRankSize = previousRank.length;
		var connections = new Array();

		for (var j = 0; j < currentRankSize; j++)
		{
			connections[j] = new Array();
		}
		
		// Iterate over the top rank and fill in the connection information
		for (var j = 0; j < rank.length; j++)
		{
			var node = rank[j];
			var rankPosition = node.getGeneralPurposeVariable(i);
			var connectedCells = node.getPreviousLayerConnectedCells(i);
		
			for (var k = 0; k < connectedCells.length; k++)
			{
				var connectedNode = connectedCells[k];
				var otherCellRankPosition = connectedNode.getGeneralPurposeVariable(i - 1);
				connections[rankPosition][otherCellRankPosition] = 201207;
			}
		}

		// Iterate through the connection matrix, crossing edges are
		// indicated by other connected edges with a greater rank position
		// on one rank and lower position on the other
		for (var j = 0; j < currentRankSize; j++)
		{
			for (var k = 0; k < previousRankSize; k++)
			{
				if (connections[j][k] == 201207)
				{
					// Draw a grid of connections, crossings are top right
					// and lower left from this crossing pair
					for (var j2 = j + 1; j2 < currentRankSize; j2++)
					{
						for (var k2 = 0; k2 < k; k2++)
						{
							if (connections[j2][k2] == 201207)
							{
								totalCrossings++;
							}
						}
					}
					
					for (var j2 = 0; j2 < j; j2++)
					{
						for (var k2 = k + 1; k2 < previousRankSize; k2++)
						{
							if (connections[j2][k2] == 201207)
							{
								totalCrossings++;
							}
						}
					}

				}
			}
		}
		
		return totalCrossings / 2;
	};

	/**
	 * Function: transpose
	 * 
	 * Takes each possible adjacent cell pair on each rank and checks if
	 * swapping them around reduces the number of crossing
	 * 
	 * Parameters:
	 * 
	 * mainLoopIteration - the iteration number of the main loop
	 * model - the internal model describing the hierarchy
	 */
	mxMedianHybridCrossingReduction.prototype.transpose = function(mainLoopIteration, model)
	{
		var improved = true;

		// Track the number of iterations in case of looping
		var count = 0;
		var maxCount = 10;
		while (improved && count++ < maxCount)
		{
			// On certain iterations allow allow swapping of cell pairs with
			// equal edge crossings switched or not switched. This help to
			// nudge a stuck layout into a lower crossing total.
			var nudge = mainLoopIteration % 2 == 1 && count % 2 == 1;
			improved = false;
			
			for (var i = 0; i < model.ranks.length; i++)
			{
				var rank = model.ranks[i];
				var orderedCells = new Array();
				
				//console.log('rank length = ', rank.length);
				for (var j = 0; j < rank.length; j++)
				{
					//console.log('j = ', j);
					var cell = rank[j];
					//console.log('cell.getGeneralPurposeVariable(i) = ', cell.getGeneralPurposeVariable(i));
					var tempRank = cell.getGeneralPurposeVariable(i);
					
					// FIXME: Workaround to avoid negative tempRanks
					if (tempRank < 0)
					{
						tempRank = j;
					}
					orderedCells[tempRank] = cell;
				}
				
				var leftCellAboveConnections = null;
				var leftCellBelowConnections = null;
				var rightCellAboveConnections = null;
				var rightCellBelowConnections = null;
				
				var leftAbovePositions = null;
				var leftBelowPositions = null;
				var rightAbovePositions = null;
				var rightBelowPositions = null;
				
				var leftCell = null;
				var rightCell = null;

				for (var j = 0; j < (rank.length - 1); j++)
				{
					// For each intra-rank adjacent pair of cells
					// see if swapping them around would reduce the
					// number of edges crossing they cause in total
					// On every cell pair except the first on each rank, we
					// can save processing using the previous values for the
					// right cell on the new left cell
					if (j == 0)
					{
						leftCell = orderedCells[j];
						leftCellAboveConnections = leftCell
								.getNextLayerConnectedCells(i);
						leftCellBelowConnections = leftCell
								.getPreviousLayerConnectedCells(i);
						leftAbovePositions = new Array();
						leftBelowPositions = new Array();
						
						for (var k = 0; k < leftAbovePositions.length; k++)
						{
							leftAbovePositions[k] = leftCellAboveConnections[k].getGeneralPurposeVariable(i + 1);
						}
						
						for (var k = 0; k < leftBelowPositions.length; k++)
						{
							leftBelowPositions[k] = leftCellBelowConnections[k].getGeneralPurposeVariable(i - 1);
						}
					}
					else
					{
						leftCellAboveConnections = rightCellAboveConnections;
						leftCellBelowConnections = rightCellBelowConnections;
						leftAbovePositions = rightAbovePositions;
						leftBelowPositions = rightBelowPositions;
						leftCell = rightCell;
					}
					
					rightCell = orderedCells[j + 1];
					rightCellAboveConnections = rightCell
							.getNextLayerConnectedCells(i);
					rightCellBelowConnections = rightCell
							.getPreviousLayerConnectedCells(i);

					rightAbovePositions = new Array();
					rightBelowPositions = new Array();

					for (var k = 0; k < rightAbovePositions.length; k++)
					{
						rightAbovePositions[k] = rightCellAboveConnections[k].getGeneralPurposeVariable(i + 1);
					}
					
					for (var k = 0; k < rightBelowPositions.length; k++)
					{
						rightBelowPositions[k] = rightCellBelowConnections[k].getGeneralPurposeVariable(i - 1);
					}

					var totalCurrentCrossings = 0;
					var totalSwitchedCrossings = 0;
					
					for (var k = 0; k < leftAbovePositions.length; k++)
					{
						for (var ik = 0; ik < rightAbovePositions.length; ik++)
						{
							if (leftAbovePositions[k] > rightAbovePositions[ik])
							{
								totalCurrentCrossings++;
							}

							if (leftAbovePositions[k] < rightAbovePositions[ik])
							{
								totalSwitchedCrossings++;
							}
						}
					}
					
					for (var k = 0; k < leftBelowPositions.length; k++)
					{
						for (var ik = 0; ik < rightBelowPositions.length; ik++)
						{
							if (leftBelowPositions[k] > rightBelowPositions[ik])
							{
								totalCurrentCrossings++;
							}

							if (leftBelowPositions[k] < rightBelowPositions[ik])
							{
								totalSwitchedCrossings++;
							}
						}
					}
					
					if ((totalSwitchedCrossings < totalCurrentCrossings) ||
						(totalSwitchedCrossings == totalCurrentCrossings &&
						nudge))
					{
						var temp = leftCell.getGeneralPurposeVariable(i);
						leftCell.setGeneralPurposeVariable(i, rightCell
								.getGeneralPurposeVariable(i));
						rightCell.setGeneralPurposeVariable(i, temp);

						// With this pair exchanged we have to switch all of
						// values for the left cell to the right cell so the
						// next iteration for this rank uses it as the left
						// cell again
						rightCellAboveConnections = leftCellAboveConnections;
						rightCellBelowConnections = leftCellBelowConnections;
						rightAbovePositions = leftAbovePositions;
						rightBelowPositions = leftBelowPositions;
						rightCell = leftCell;
						
						if (!nudge)
						{
							// Don't count nudges as improvement or we'll end
							// up stuck in two combinations and not finishing
							// as early as we should
							improved = true;
						}
					}
				}
			}
		}
	};

	/**
	 * Function: weightedMedian
	 * 
	 * Sweeps up or down the layout attempting to minimise the median placement
	 * of connected cells on adjacent ranks
	 * 
	 * Parameters:
	 * 
	 * iteration - the iteration number of the main loop
	 * model - the internal model describing the hierarchy
	 */
	mxMedianHybridCrossingReduction.prototype.weightedMedian = function(iteration, model)
	{
		// Reverse sweep direction each time through this method
		var downwardSweep = (iteration % 2 == 0);
		if (downwardSweep)
		{
			for (var j = model.maxRank - 1; j >= 0; j--)
			{
				this.medianRank(j, downwardSweep);
			}
		}
		else
		{
			for (var j = 1; j < model.maxRank; j++)
			{
				this.medianRank(j, downwardSweep);
			}
		}
	};

	/**
	 * Function: medianRank
	 * 
	 * Attempts to minimise the median placement of connected cells on this rank
	 * and one of the adjacent ranks
	 * 
	 * Parameters:
	 * 
	 * rankValue - the layer number of this rank
	 * downwardSweep - whether or not this is a downward sweep through the graph
	 */
	mxMedianHybridCrossingReduction.prototype.medianRank = function(rankValue, downwardSweep)
	{
		var numCellsForRank = this.nestedBestRanks[rankValue].length;
		var medianValues = new Array();

		for (var i = 0; i < numCellsForRank; i++)
		{
			var cell = this.nestedBestRanks[rankValue][i];
			medianValues[i] = new MedianCellSorter();
			medianValues[i].cell = cell;

			// Flip whether or not equal medians are flipped on up and down
			// sweeps
			medianValues[i].nudge = !downwardSweep;
			var nextLevelConnectedCells;
			
			if (downwardSweep)
			{
				nextLevelConnectedCells = cell
						.getNextLayerConnectedCells(rankValue);
			}
			else
			{
				nextLevelConnectedCells = cell
						.getPreviousLayerConnectedCells(rankValue);
			}
			
			var nextRankValue;
			
			if (downwardSweep)
			{
				nextRankValue = rankValue + 1;
			}
			else
			{
				nextRankValue = rankValue - 1;
			}

			if (nextLevelConnectedCells != null
					&& nextLevelConnectedCells.length != 0)
			{
				medianValues[i].medianValue = this.medianValue(
						nextLevelConnectedCells, nextRankValue);
			}
			else
			{
				// Nodes with no adjacent vertices are given a median value of
				// -1 to indicate to the median function that they should be
				// left of their current position if possible.
				medianValues[i].medianValue = -1.0; // TODO needs to account for
				// both layers
			}
		}
		
		medianValues.sort(MedianCellSorter.prototype.compare);
		
		// Set the new position of each node within the rank using
		// its temp variable
		for (var i = 0; i < numCellsForRank; i++)
		{
			medianValues[i].cell.setGeneralPurposeVariable(rankValue, i);
		}
	};

	/**
	 * Function: medianValue
	 * 
	 * Calculates the median rank order positioning for the specified cell using
	 * the connected cells on the specified rank. Returns the median rank
	 * ordering value of the connected cells
	 * 
	 * Parameters:
	 * 
	 * connectedCells - the cells on the specified rank connected to the
	 * specified cell
	 * rankValue - the rank that the connected cell lie upon
	 */
	mxMedianHybridCrossingReduction.prototype.medianValue = function(connectedCells, rankValue)
	{
		var medianValues = new Array();
		var arrayCount = 0;
		
		for (var i = 0; i < connectedCells.length; i++)
		{
			var cell = connectedCells[i];
			medianValues[arrayCount++] = cell.getGeneralPurposeVariable(rankValue);
		}

		medianValues.sort(MedianCellSorter.prototype.compare);
		
		if (arrayCount % 2 == 1)
		{
			// For odd numbers of adjacent vertices return the median
			return medianValues[arrayCount / 2];
		}
		else if (arrayCount == 2)
		{
			return ((medianValues[0] + medianValues[1]) / 2.0);
		}
		else
		{
			var medianPoint = arrayCount / 2;
			var leftMedian = medianValues[medianPoint - 1] - medianValues[0];
			var rightMedian = medianValues[arrayCount - 1]
					- medianValues[medianPoint];

			return (medianValues[medianPoint - 1] * rightMedian + medianValues[medianPoint]
					* leftMedian)
					/ (leftMedian + rightMedian);
		}
	};
	
	/**
	 * Class: MedianCellSorter
	 * 
	 * A utility class used to track cells whilst sorting occurs on the median
	 * values. Does not violate (x.compareTo(y)==0) == (x.equals(y))
	 */
	{
		/* 
		 * Constructor: MedianCellSorter
		 * 
		 * Constructs a new median cell sorter.
		 */
		function MedianCellSorter()
		{
			// empty
		};
	
		/**
		 * Variable: medianValue
		 * 
		 * The weighted value of the cell stored.
		 */
		MedianCellSorter.prototype.medianValue = 0;
	
		/**
		 * Variable: nudge
		 * 
		 * Whether or not to flip equal median values.
		 */
		MedianCellSorter.prototype.nudge = false;
	
		/**
		 * Variable: cell
		 * 
		 * The cell whose median value is being calculated
		 */
		MedianCellSorter.prototype.cell = false;

		/**
		 * Function: compare
		 * 
		 * Compares two MedianCellSorters.
		 */
		MedianCellSorter.prototype.compare = function(a, b)
		{
			if (a != null && b != null)
			{
				if (b.medianValue > a.medianValue)
				{
					return -1;
				}
				else if (b.medianValue < a.medianValue)
				{
					return 1;
				}
				else
				{
					if (b.nudge)
					{
						return -1;
					}
					else
					{
						return 1;
					}
				}
			}
			else
			{
				return 0;
			}
		};

	}

}
