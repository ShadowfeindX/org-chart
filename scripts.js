'use strict';

(function($){

  $(function() {

    var datascource = {
      'name': 'No One', 'title': 'Important', 'children': [{'name': 'No One', 'title': 'Less Important','children': [{'name': 'No One', 'title': 'Not Important'}]}]
    };

    var getId = function() {
      return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001);
    };

    $('#chart-container').orgchart({
      'data': datascource,
      'nodeContent': 'title',
      'exportButton': true,
      'draggable': true,
      'pan': true,
      'zoom': true,
      'exportFilename': 'MyOrgChart',
      'parentNodeSymbol': 'fa-th-large',
      'createNode': function($node, data) {
        $node.id = getId();
      }
    })
    .on('click', '.node', function() {
      var $this = $(this);
      $('#selected-node').val($this.find('.title').text()).data('node', $this);
    })
    .on('click', '.orgchart', function(event) {
      if (!$(event.target).closest('.node').length) {
        $('#selected-node').val('');
      }
    });

    $('input[name="chart-state"]').on('click', function() {
      $('.orgchart').toggleClass('view-state', this.value !== 'view');
      $('#edit-panel').toggleClass('view-state', this.value === 'view');
      if ($(this).val() === 'edit') {
        $('.orgchart').find('tr').removeClass('hidden')
          .find('td').removeClass('hidden')
          .find('.node').removeClass('slide-up slide-down slide-right slide-left');
      } else {
        $('#btn-reset').trigger('click');
      }
    });

    $('input[name="node-type"]').on('click', function() {
      var $this = $(this);
      if ($this.val() === 'parent') {
        $('#edit-panel').addClass('edit-parent-node');
        $('#new-nodelist').children(':gt(0)').remove();
      } else {
        $('#edit-panel').removeClass('edit-parent-node');
      }
    });

    $('#btn-add-input').on('click', function() {
      $('#new-nodelist').append('<li><input type="text" placeholder="Name" class="new-node-name">        <input type="text" placeholder="Title" class="new-node-title"></li>');
    });

    $('#btn-remove-input').on('click', function() {
      var inputs = $('#new-nodelist').children('li');
      if (inputs.length > 1) {
        inputs.last().remove();
      }
    });

    $('#btn-add-nodes').on('click', function() {
      var $chartContainer = $('#chart-container');
      var nodeVals = [];
      $('#new-nodelist').find('.new-node-name').each(function(index, item) {
        var validVal = item.value.trim();
        if (validVal.length) {
          nodeVals.push([validVal]);
        }
      });
      $('#new-nodelist').find('.new-node-title').each(function(index, item) {
        var validVal = item.value.trim();
        if (validVal.length) {
          nodeVals[index].push(validVal);
        }
      });
      var $node = $('#selected-node').data('node');
      if (!nodeVals.length) {
        alert('Please input value for new node');
        return;
      }
      var nodeType = $('input[name="node-type"]:checked');
      if (!nodeType.length) {
        alert('Please select a node type');
        return;
      }
      if (nodeType.val() !== 'parent' && !$('.orgchart').length) {
        alert('Please create the root node first when you want to build up the orgchart from the scratch');
        return;
      }
      if (nodeType.val() !== 'parent' && !$node) {
        alert('Please select one node in orgchart');
        return;
      }
      if (nodeType.val() === 'parent') {
        if (!$chartContainer.children().length) {// if the original chart has been deleted
          $chartContainer.orgchart({
            'data': { 'name': nodeVals[0][1], 'title' : nodeVals[0][1] },
            'nodeContent': 'title',
            'exportButton': true,
            'draggable': true,
            'pan': true,
            'zoom': true,
            'exportFilename': 'MyOrgChart',
            'parentNodeSymbol': 'fa-th-large',
            'createNode': function($node, data) {
              $node.id = getId();
            }
          })
          .find('.orgchart').addClass('view-state');
        } else {
          $chartContainer.orgchart('addParent', $chartContainer.find('.node:first'), { 'name': nodeVals[0][0], 'title' : nodeVals[0][1], 'Id': getId() });
        }
      } else if (nodeType.val() === 'siblings') {
        $chartContainer.orgchart('addSiblings', $node,
          { 'siblings': nodeVals.map(function(item) { return { 'name': item[0], 'title': item[1], 'relationship': '110', 'Id': getId() }; })
        });
      } else {
        var hasChild = $node.parent().attr('colspan') > 0 ? true : false;
        if (!hasChild) {
          var rel = nodeVals.length > 1 ? '110' : '100';
          $chartContainer.orgchart('addChildren', $node, {
              'children': nodeVals.map(function(item) {
                return { 'name': item[0], 'title': item[1], 'relationship': rel, 'Id': getId() };
              })
            }, $.extend({}, $chartContainer.find('.orgchart').data('options'), { depth: 0 }));
        } else {
          $chartContainer.orgchart('addSiblings', $node.closest('tr').siblings('.nodes').find('.node:first'),
            { 'siblings': nodeVals.map(function(item) { return { 'name': item[0], 'title': item[1], 'relationship': '110', 'Id': getId() }; })
          });
        }
      }
    });

    $('#btn-delete-nodes').on('click', function() {
      var $node = $('#selected-node').data('node');
      if (!$node) {
        alert('Please select one node in orgchart');
        return;
      } else if ($node[0] === $('.orgchart').find('.node:first')[0]) {
        if (!window.confirm('Are you sure you want to delete the whole chart?')) {
          return;
        }
      }
      $('#chart-container').orgchart('removeNodes', $node);
      $('#selected-node').val('').data('node', null);
    });

    $('#btn-reset').on('click', function() {
      $('.orgchart').find('.focused').removeClass('focused');
      $('#selected-node').val('');
      $('#new-nodelist').find('input').val('').parent().siblings().remove();
      $('#node-type-panel').find('input').prop('checked', false);
    });

  });

})(jQuery);