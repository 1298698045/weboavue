<template>
<div class="container">
    <el-dialog title="工作流" :append-to-body="true" :visible.sync="show" top="20vh" width="800px">
        <div class="popup">
    <div class="popup-head">
      <div class="popup-title">
        <div class="sc-1hbaj8q-0 iTByNY">
          <span class="sc-1hbaj8q-1 kpCmWF">
            <div style="display: inline-block; position: relative; outline: 0px;">
              <span class="css-1w238lj">
                <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/story.svg'); border-radius: 2px;"></span>
              </span>
            </div>
          </span>
          <span class="sc-1hbaj8q-1 kpCmWF">
            <div style="display: inline-block; position: relative; outline: 0px;">
              <span class="css-1w238lj">
                <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/task.svg'); border-radius: 2px;"></span>
              </span>
            </div>
          </span>
          <span class="sc-1hbaj8q-1 kpCmWF">
            <div style="display: inline-block; position: relative; outline: 0px;">
              <span class="css-1w238lj">
                <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/bug.svg'); border-radius: 2px;"></span>
              </span>
            </div>
          </span>
          <span class="sc-1hbaj8q-1 kpCmWF">
            <div style="display: inline-block; position: relative; outline: 0px;">
              <span class="css-1w238lj">
                <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/epic.svg'); border-radius: 2px;"></span>
              </span>
            </div>
          </span>
          <span class="sc-1hbaj8q-1 kpCmWF">
            <div style="display: inline-block; position: relative; outline: 0px;">
              <span class="css-1w238lj">
                <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/subtask.png'); border-radius: 2px;"></span>
              </span>
            </div>
          </span>
          <span class="sc-1hbaj8q-2 ifltE">
            <h1 class="css-jb7d7v">
              <span id="modal-dialog-title-1611" class="css-hz5ces">工作流</span>
            </h1>
          </span>
        </div>
      </div>
    </div>
    <div class="popup-body">
      <div class="body-main">
        
        <div class="sc-1hbaj8q-3 hsVrTI">
          <div class="sc-62strk-0 hxgGqG">
            <div class="sc-62strk-2 dGoeJn">
              <div class="workflow-designer" style="width: 100%; height: 100%;">
                <div class="workflow-canvas-wrapper" style="height: 100%;">
                  <div class="container" style="height: 100%;">
                    <WorkflowView :zoomp="zoomp"></WorkflowView>
                    <!-- <div class="canvas" id="workflow-designer1" style="cursor: default; height: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
                      <svg height="342" version="1.1" width="752" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; top: -0.450952px; vertical-align: middle; background: rgb(255, 255, 255);" viewBox="-12.429011081083445 -251.5845947265625 1504 684" preserveAspectRatio="xMinYMin"><rect x="1195.5771484375" y="-12.999962329864502" width="120" height="32" rx="4" ry="4" fill="#deebff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1240.0771484375" y="-12.999962329864502" width="34.730751037597656" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#0747a6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,1240.0771,-13)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">上线</tspan></text><rect x="1339.141357421875" y="-12.999962329864502" width="120" height="32" rx="4" ry="4" fill="#e3fcef" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1383.141357421875" y="-12.999962329864502" width="34.730751037597656" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#006644" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,1383.1414,-13)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">验收</tspan></text><rect x="1061.5618896484375" y="-16" width="120" height="32" rx="4" ry="4" fill="#deebff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1105.5618896484375" y="-16" width="34.730751037597656" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#0747a6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,1105.5619,-16)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">测试</tspan></text><rect x="928.3644409179688" y="-16" width="120" height="32" rx="4" ry="4" fill="#deebff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="972.3644409179688" y="-16" width="34.730751037597656" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#0747a6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,972.3644,-16)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">开发</tspan></text><rect x="798.5057983398438" y="-16" width="120" height="32" rx="4" ry="4" fill="#dfe1e6" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="837.5057983398438" y="-16" width="43.75901412963867" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#42526e" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,837.5058,-16)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">已分配</tspan></text><rect x="649.862548828125" y="-16" width="120" height="32" rx="4" ry="4" fill="#dfe1e6" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="688.362548828125" y="-16" width="45.725955963134766" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#42526e" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,688.3625,-16)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">未分配</tspan></text><rect x="511.43316650390625" y="-16" width="120" height="32" rx="4" ry="4" fill="#deebff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="564.3706665039062" y="-16" width="14.115964412689209" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#0747a6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,564.3707,-16)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">1</tspan></text><rect x="383.401123046875" y="-90.1688551902771" width="120" height="32" rx="4" ry="4" fill="#e3fcef" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="423.17919921875" y="-90.1688551902771" width="40.300926208496094" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#006644" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,423.1792,-90.1689)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">DONE</tspan></text><rect x="215.0038604736328" y="-111.79587125778198" width="120" height="32" rx="4" ry="4" fill="#deebff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="232.4704132080078" y="-111.79587125778198" width="84.90446472167969" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#0747a6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,232.4704,-111.7959)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">IN PROGRESS</tspan></text><rect x="95.00386047363281" y="-12.999962329864502" width="120" height="32" rx="4" ry="4" fill="#dfe1e6" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="132.9655303955078" y="-12.999962329864502" width="45.86687088012695" height="32" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="4" y="16" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#42526e" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,132.9655,-13)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">TO DO</tspan></text><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.3.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><path fill="none" stroke="#c1c7d0" d="M40,-30L40,-30S40,-30,40,-30L40,1.000037670135498S40,3.000037670135498,42,3.000037670135498L89.00386047363281,3.000037670135498S89.00386047363281,3.000037670135498,89.00386047363281,3.000037670135498" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linejoin: round; opacity: 1;" stroke-linejoin="round" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M7,7L0,0L7,-7L0,0" stroke-width="4" transform="matrix(-1,0,0,-1,89.0039,3)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><rect x="22.830036401748657" y="-8.999962329864502" width="50.34375" height="24" rx="12" ry="12" fill="#ffffff" stroke="#c1c7d0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="0" y="0" width="0" height="10" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="1"></rect><rect x="26.830036401748657" y="-6.999962329864502" width="43.20738983154297" height="20" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="3" y="10" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="12px" stroke="none" fill="#091e42" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: normal;" font-weight="normal" transform="matrix(1,0,0,1,26.83,-7)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Create</tspan></text><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="155.0038604736328" y="17.000037670135498" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="275.0038604736328" y="-81.79587125778198" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="443.401123046875" y="-60.1688551902771" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="571.4331665039062" y="14" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="709.862548828125" y="14" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="858.5057983398438" y="14" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="988.3644409179688" y="14" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1121.5618896484375" y="14" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1399.141357421875" y="17.000037670135498" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1255.5771484375" y="17.000037670135498" width="14" height="80" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="4" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><path fill="none" stroke="#c1c7d0" d="M1255.5771484375,25.000037670135498L1255.5771484375,97.0000376701355" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M1262.5771484375,30.500037670135498L1255.5771484375,23.500037670135498L1262.5771484375,16.500037670135498L1255.5771484375,23.500037670135498" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,1279.0772,-1232.0771)" x="1255.5771484375" y="21.000037670135498" stroke-width="4" opacity="1"></path><rect x="1229.5771484375" y="91.0000376701355" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1227.5771484375" y="89.0000376701355" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,1227.5771,89)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="1253.0771484375" y="50.5000376701355" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1255.5771484375" y="17.000037670135498" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M1399.141357421875,25.000037670135498L1399.141357421875,97.0000376701355" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M1406.141357421875,30.500037670135498L1399.141357421875,23.500037670135498L1406.141357421875,16.500037670135498L1399.141357421875,23.500037670135498" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,1422.6414,-1375.6413)" x="1399.141357421875" y="21.000037670135498" stroke-width="4" opacity="1"></path><rect x="1373.141357421875" y="91.0000376701355" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1371.141357421875" y="89.0000376701355" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,1371.1414,89)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="1396.641357421875" y="50.5000376701355" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1399.141357421875" y="17.000037670135498" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M1121.5618896484375,22L1121.5618896484375,94" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M1128.5618896484375,27.5L1121.5618896484375,20.5L1128.5618896484375,13.5L1121.5618896484375,20.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,1142.0619,-1101.0619)" x="1121.5618896484375" y="18" stroke-width="4" opacity="1"></path><rect x="1095.5618896484375" y="88" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1093.5618896484375" y="86" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,1093.5619,86)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="1119.0618896484375" y="47.5" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="1121.5618896484375" y="14" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M988.3644409179688,22L988.3644409179688,94" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M995.3644409179688,27.5L988.3644409179688,20.5L995.3644409179688,13.5L988.3644409179688,20.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,1008.8644,-967.8644)" x="988.3644409179688" y="18" stroke-width="4" opacity="1"></path><rect x="962.3644409179688" y="88" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="960.3644409179688" y="86" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,960.3644,86)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="985.8644409179688" y="47.5" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="988.3644409179688" y="14" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M858.5057983398438,22L858.5057983398438,94" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M865.5057983398438,27.5L858.5057983398438,20.5L865.5057983398438,13.5L858.5057983398438,20.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,879.0058,-838.0058)" x="858.5057983398438" y="18" stroke-width="4" opacity="1"></path><rect x="832.5057983398438" y="88" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="830.5057983398438" y="86" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,830.5058,86)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="856.0057983398438" y="47.5" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="858.5057983398438" y="14" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M709.862548828125,22L709.862548828125,94" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M716.862548828125,27.5L709.862548828125,20.5L716.862548828125,13.5L709.862548828125,20.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,730.3625,-689.3625)" x="709.862548828125" y="18" stroke-width="4" opacity="1"></path><rect x="683.862548828125" y="88" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="681.862548828125" y="86" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,681.8625,86)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="707.362548828125" y="47.5" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="709.862548828125" y="14" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M571.4331665039062,22L571.4331665039062,94" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M578.4331665039062,27.5L571.4331665039062,20.5L578.4331665039062,13.5L571.4331665039062,20.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,591.9332,-550.9332)" x="571.4331665039062" y="18" stroke-width="4" opacity="1"></path><rect x="545.4331665039062" y="88" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="543.4331665039062" y="86" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,543.4332,86)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="568.9331665039062" y="47.5" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="571.4331665039062" y="14" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M443.401123046875,-52.1688551902771L443.401123046875,19.8311448097229" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M450.401123046875,-46.6688551902771L443.401123046875,-53.6688551902771L450.401123046875,-60.6688551902771L443.401123046875,-53.6688551902771" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,389.7323,-497.07)" x="443.401123046875" y="-56.1688551902771" stroke-width="4" opacity="1"></path><rect x="417.401123046875" y="13.8311448097229" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="415.401123046875" y="11.8311448097229" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,415.4011,11.8311)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="440.901123046875" y="-26.6688551902771" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="443.401123046875" y="-60.1688551902771" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M275.0038604736328,-73.79587125778198L275.0038604736328,-1.7958712577819824" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M282.0038604736328,-68.29587125778198L275.0038604736328,-75.29587125778198L282.0038604736328,-82.29587125778198L275.0038604736328,-75.29587125778198" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,199.708,-350.2997)" x="275.0038604736328" y="-77.79587125778198" stroke-width="4" opacity="1"></path><rect x="249.0038604736328" y="-7.795871257781982" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="247.0038604736328" y="-9.795871257781982" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,247.0039,-9.7959)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="272.5038604736328" y="-48.29587125778198" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="275.0038604736328" y="-81.79587125778198" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><path fill="none" stroke="#c1c7d0" d="M155.0038604736328,25.000037670135498L155.0038604736328,97.0000376701355" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M162.0038604736328,30.500037670135498L155.0038604736328,23.500037670135498L162.0038604736328,16.500037670135498L155.0038604736328,23.500037670135498" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" transform="matrix(0,1,-1,0,178.5039,-131.5038)" x="155.0038604736328" y="21.000037670135498" stroke-width="4" opacity="1"></path><rect x="129.0038604736328" y="91.0000376701355" width="52" height="18" rx="2" ry="2" fill="#42526e" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="127.00386047363281" y="89.0000376701355" width="58.72116470336914" height="21.80165958404541" rx="3" ry="3" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="0" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><text x="5" y="10.900829792022705" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="11px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,127.0039,89)" stroke-width="1"><tspan dy="3.9338871240615845" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">任意状态</tspan></text><rect x="152.5038604736328" y="50.5000376701355" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)"></rect><rect x="155.0038604736328" y="17.000037670135498" width="8" height="14" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="4"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><rect x="0" y="0" width="5" height="5" rx="2" ry="2" fill="#646464" stroke="#1b1b1b" stroke-width="1" opacity="0" transform="matrix(1,0,0,1,0,0)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></rect><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="99.00386047363281" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="219.0038604736328" cy="-107.79587125778198" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="387.401123046875" cy="-86.1688551902771" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="515.4331665039062" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="653.862548828125" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="802.5057983398438" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="932.3644409179688" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1065.5618896484375" cy="-12" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1343.141357421875" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="1199.5771484375" cy="-8.999962329864502" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><ellipse cx="40" cy="-50" rx="20" ry="20" fill="#3d4b66" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" x="20" y="-70" stroke-width="0" opacity="1"></ellipse><rect x="26.106277465820312" y="-58.9173583984375" width="27.787445068359375" height="17.834716796875" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="13.893722534179688" y="8.9173583984375" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8px" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial, Helvetica, sans-serif; font-size: 8px; font-weight: bold;" font-weight="bold" transform="matrix(1,0,0,1,26.1063,-58.9174)" stroke-width="1"><tspan dy="2.950415015220642" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">开始</tspan></text><ellipse cx="24" cy="-66" rx="4" ry="4" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none; cursor: crosshair;" stroke-width="1"></ellipse><path fill="none" stroke="#c1c7d0" d="M341.0038604736328,-95.79587125778198L341.0038604736328,-95.79587125778198S341.0038604736328,-95.79587125778198,341.0038604736328,-95.79587125778198L390.2024917602539,-95.79587125778198S392.2024917602539,-95.79587125778198,392.2024917602539,-97.79587125778198L392.2024917602539,-114.1688551902771S392.2024917602539,-116.1688551902771,394.2024917602539,-116.1688551902771L441.401123046875,-116.1688551902771S443.401123046875,-116.1688551902771,443.401123046875,-114.1688551902771L443.401123046875,-96.1688551902771S443.401123046875,-96.1688551902771,443.401123046875,-96.1688551902771" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linejoin: round; opacity: 1;" stroke-linejoin="round" stroke-width="4" opacity="1"></path><path fill="#c1c7d0" stroke="#c1c7d0" d="M7,7L0,0L7,-7L0,0" stroke-width="4" transform="matrix(0,-1,1,0,443.4011,-96.1689)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><rect x="348.2024917602539" y="-127.98236322402954" width="88" height="24" rx="12" ry="12" fill="#ffffff" stroke="#c1c7d0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="4" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><rect x="0" y="0" width="0" height="10" rx="0" ry="0" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: none;" stroke-width="1"></rect><rect x="352.2024917602539" y="-125.98236322402954" width="81.72722625732422" height="20" rx="2" ry="2" fill="none" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;" stroke-width="0" opacity="1" transform="matrix(1,0,0,1,0,0)"></rect><text x="3" y="10" text-anchor="start" font-family="Arial, Helvetica, sans-serif" font-size="12px" stroke="none" fill="#091e42" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: normal;" font-weight="normal" transform="matrix(1,0,0,1,352.2025,-125.9824)" stroke-width="1"><tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">进行中转完成</tspan></text></svg>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="sc-62strk-3 coiaJW">
              <div class="sc-62strk-4 jpatMI">
                <button class="css-b7h3z8" type="button" @click="zoomSub">
                  <span class="css-16j5qb5">
                    <span role="img" aria-label="缩小" class="css-1afrefi" style="--icon-primary-color:var(--ds-icon, #B3BAC5); --icon-secondary-color:var(--ds-surface, #FFFFFF);">
                      <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM13.5 11.5h-6a1 1 0 010-2h6a1 1 0 010 2" fill="currentColor" fill-rule="evenodd"></path></svg>
                    </span>
                  </span>
                </button>
                <input type="range" max="2" min="1" step="0.1" class="css-1t8gwkl" v-model="zoomp" style="--track-fg-width:0%;">
                <button class="css-1t9s85p" type="button" @click="zoomAdd">
                  <span class="css-16j5qb5">
                    <span role="img" aria-label="放大" class="css-1afrefi" style="--icon-primary-color:var(--ds-icon, #B3BAC5); --icon-secondary-color:var(--ds-surface, #FFFFFF);"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM13.5 11.5a1 1 0 000-2h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2z" fill="currentColor" fill-rule="evenodd"></path></svg></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-bottom">
      <div class="popup-footer">
        <el-button size="small" @click="EditWorkflow">编辑工作流</el-button>
        <el-button size="small" @click="closepopup">关闭</el-button>
    </div>
    </div>
    
  </div>
  </el-dialog>
</div>
  
</template>
<script>
import commonapi from '@/utils/commonapi.js'
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue'
import icon from "@/components/schedule/detail/icon.vue"
import '@/components/schedule/detail/popupstyle.css'
import WorkflowView from "@/components/schedule/detail/workflow/view.vue"
export default {
  inject:['reload'],
  props:['value','deletelist','editContentId','ShowEditWorkflow'],
  components: {
    researchelselect,icon,WorkflowView
  },
  mounted() {
  },
  computed:{
      show:{
          get(){
            return this.value
          },
          set(val){
              this.$emit('input',val)
          }
      }
  },
  watch:{
    editContentId(){
      this.id=this.editContentId;
    }
  },
  data() {
    return {
      index:0,
      createdagain:false,
      zoomp:1,
      id:'',
      ruleForm: {
        Subject:'',
        Count:''
      },
      rules: {
        Subject: [{ required: true, message: "请提供一个名称", trigger: "blur" }]
      },
    };
  },
  created(){
  },
  methods: {
    zoomAdd() {
        if (this.zoomp > 2) {
            return
        }
        this.zoomp = this.zoomp + 0.1
    },
    zoomSub() {
        if (this.zoomp <= 1) {
            return
        }
        this.zoomp = this.zoomp - 0.1
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          commonapi.entitysaverecord(this.ruleForm,4200).then(()=>{
            if(!this.createdagain){
              this.reload()
            }else{
              this.$message.success('创建成功')
              this.ruleForm.Subject = ''
              this.index++
              this.$refs.Subject.focus()
              this.$emit('created')
            }
          })
        } else {
          this.$message.error('请输入所有必填项')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closepopup() {
        this.$emit('input',false)
    },
    deleteColumn(){
        this.deletelist(this.id)
    },
    EditWorkflow() {
      this.ShowEditWorkflow()
    }
  },
};
</script>
<style scoped>
.popup-body{
  height: 367px !important;
  /* padding: 0px; */
  overflow: hidden;
}
.popup-title{
  color: #172B4D;
  font-size: 20px;
}
.popup-head{
  padding: 22px 24px 16px;
}
.popup>>>.el-form--label-top .el-form-item__label{
  padding-bottom: 0 !important;
}
.popup>>>.el-input__inner{
  padding-right: 0 !important;
  padding-left: 5px !important;
}
.deleteColumn{
  float: left;
}
.popup>>>.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
  float: right;
  margin-left: 4px;
}
.popup>>>.el-form-item {
  margin-bottom: 0px;
}
.popup>>>.el-form-item1{
  margin-bottom: 22px;
}
.disabled {
    cursor: not-allowed;
    color: #A5ADBA !important;
    background: rgba(9, 30, 66, 0.04) !important;
    text-decoration: none;
}
.popup>>>.el-button.el-button--primary :hover{
    background-color: transparent;
}
.popup>>>.el-button{
  border: none;
  font-size: 14px;
}
.popup>>>.el-button:focus, .popup>>>.el-button:hover {
    color: #42526E;
    border: none;
    background-color: rgba(9, 30, 66, 0.08);
}
.iTByNY {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}
.kpCmWF {
    margin-right: 6px;
}
.css-1w238lj {
    height: 24px;
    width: 24px;
    -webkit-align-items: stretch;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    background-color: transparent;
    border-radius: 2px;
    box-sizing: content-box;
    cursor: inherit;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    outline: none;
    overflow: hidden;
    position: static;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: -webkit-transform 200ms,opacity 200ms;
    -webkit-transition: transform 200ms,opacity 200ms;
    transition: transform 200ms,opacity 200ms;
    box-shadow: 0 0 0 2px transparent;
    border: none;
    margin: 2px;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
}
.css-ob4lje {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-flex: 1 1 100%;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.ifltE {
    color: var(--ds-text,#172B4D);
}
.css-jb7d7v {
    display: flex;
    min-width: 0px;
    margin: 0px;
    -webkit-box-align: center;
    align-items: center;
    font-size: 20px;
    font-style: inherit;
    font-weight: 500;
    letter-spacing: -0.008em;
    line-height: 1;
}
.css-hz5ces {
    min-width: 0px;
    flex: 1 1 auto;
    overflow-wrap: break-word;
}

.hsVrTI {
    background: var(--ds-surface-raised,#FFFFFF);
    box-shadow: var(--ds-shadow-raised,0 1px 1px rgba(9,30,66,0.25),0 0 1px 1px rgba(9,30,66,0.13));
}
.hxgGqG {
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    height: 100%;
}
.dGoeJn {
    width: 100%;
    height: auto;
}
.coiaJW {
    position: relative;
}
.jpatMI {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 200px;
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    background: var(--ds-surface,#F4F5F7);
    height: 40px;
    justify-content: space-evenly;
    padding: 0px 4px;
}
.css-b7h3z8 {
    -webkit-box-align: baseline;
    align-items: baseline;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: relative;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    height: 2.28571em;
    line-height: 2.28571em;
    vertical-align: middle;
    width: auto;
    -webkit-box-pack: center;
    justify-content: center;
    color: var(--ds-text, #42526E) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: none;
    padding: 0px 2px;
}
.css-b7h3z8[disabled] {
    cursor: not-allowed;
    color: var(--ds-text-disabled, #A5ADBA) !important;
    background: none;
    text-decoration: none;
}

input {
    writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: rgb(118, 118, 118);
    border-image: initial;
}
input:not([type=checkbox]):not([type=radio]), select, textarea {
    outline: 0;
    border-bottom-right-radius: 3.01px;
}
input[type="range" i] {
    appearance: auto;
    cursor: default;
    color: rgb(16, 16, 16);
    padding: initial;
    border: initial;
    margin: 2px;
}
.css-1t8gwkl {
    width: 100%;
    height: 40px;
    background: transparent;
    appearance: none;
    --thumb-border: transparent;
    --thumb-shadow: var(--ds-shadow-overlay, 0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31));
    --track-bg: var(--ds-background-neutral, #EBECF0);
    --track-fg: var(--ds-background-brand-bold, #0052CC);
}
.css-1t9s85p {
    -webkit-box-align: baseline;
    align-items: baseline;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: relative;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    height: 2.28571em;
    line-height: 2.28571em;
    vertical-align: middle;
    width: auto;
    -webkit-box-pack: center;
    justify-content: center;
    color: var(--ds-text, #42526E) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: none;
    padding: 0px 2px;
}
.css-16j5qb5 {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
    display: flex;
    margin: 0px 2px;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: center;
    font-size: 0px;
    line-height: 0;
    user-select: none;
}
.css-1afrefi {
    display: inline-block;
    flex-shrink: 0;
    line-height: 1;
    width: 24px;
    height: 24px;
}
.css-1afrefi > svg {
    overflow: hidden;
    pointer-events: none;
    max-width: 100%;
    max-height: 100%;
    color: var(--icon-primary-color);
    fill: var(--icon-secondary-color);
    vertical-align: bottom;
}
.css-1afrefi > svg {
    width: 24px;
    height: 24px;
}
.jpatMI{
    bottom: 25px;
    right: 25px;
}
input[type=range]{
    appearance: auto;
    background-size: 50% 100%;
    border: 0 !important; 
    outline: none; 
}
input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: rgba(205, 224, 230, 0.5); 
    border: 0 !important; 
    height: 8px;
    border-radius: 10px;
    appearance: none;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    height: 15px;
    width: 15px;
    background: #fff !important; 
    border-radius: 50%;
    margin-top: -4px;
    border: 2px solid #0052CC;
    cursor: pointer;
}
input[type=range]::-webkit-fill-lower{
    -webkit-appearance: none !important;
    height: 8px;
    border-radius: 10px;
    background: #0052CC !important; 
}
</style>