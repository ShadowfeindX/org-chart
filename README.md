<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Organization Chart</title>

    <link rel="icon" type="image/x-icon" href="logo.ico">
    <link rel="stylesheet" href="https://cdn.rawgit.com/FortAwesome/Font-Awesome/master/css/font-awesome.min.css">
    <link rel="stylesheet" href="orgchart.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="overrides.css">

</head>
<body>
  <div id="chart-container"></div>
  <div id="edit-panel" class="view-state">
    <span id="chart-state-panel" class="radio-panel">
      <input type="radio" name="chart-state" id="rd-view" value="view" checked="true"><label for="rd-view">View</label>
      <input type="radio" name="chart-state" id="rd-edit" value="edit"><label for="rd-edit">Edit</label>
    </span>
    <label class="selected-node-group">selected node:</label>
    <input type="text" id="selected-node" class="selected-node-group">
    <label>new node:</label>
    <ul id="new-nodelist">
      <li>
        <input type="text" placeholder="Name" class="new-node-name">
        <input type="text" placeholder="Title" class="new-node-title">
      </li>
    </ul>
    <i class="fa fa-plus-circle btn-inputs" id="btn-add-input"></i>
    <i class="fa fa-minus-circle btn-inputs" id="btn-remove-input"></i>
    <span id="node-type-panel" class="radio-panel">
      <input type="radio" name="node-type" id="rd-parent" value="parent"><label for="rd-parent">Parent(root)</label>
      <input type="radio" name="node-type" id="rd-child" value="children"><label for="rd-child">Child</label>
      <input type="radio" name="node-type" id="rd-sibling" value="siblings"><label for="rd-sibling">Sibling</label>
    </span>
    <button type="button" id="btn-add-nodes">Add</button>
    <button type="button" id="btn-delete-nodes">Delete</button>
    <button type="button" id="btn-reset">Reset</button>
  </div>
  <script type="text/javascript" src="jquery-3.1.0.min.js"></script>
  <script type="text/javascript" src="html2canvas.min.js"></script>
  <script type="text/javascript" src="orgchart.js"></script>
  <script type="text/javascript" src="scripts.js"></script>
  </body>
</html>
