flex_masonry = function(flex_ele) {
  var element = document.querySelector(flex_ele);
  var child_e = document.querySelectorAll(".masonry")[0].children;
  Array.max = function(array) {
    return Math.max.apply(Math, array);
  };
  flex_magic = {
    render: function() {
      var width_e = (child_e[0].getBoundingClientRect()
        .width / element.getBoundingClientRect()
        .width) * 100;
      var num = Math.floor(100 / width_e);
      var gutter_h = 15;
      var gutter_v = (100 - (width_e * num)) / (num + 1);;
      var column_matrix = new Array(num)
        .fill(0);
      for (var i = 0, len = child_e.length; i < len; i++) {
        var addToCol = minIndex(column_matrix);
        var leftPos = (addToCol * width_e) + (gutter_v * (addToCol + 1));
        child_e[i].style.position = 'absolute';
        child_e[i].style.top = column_matrix[addToCol] + 'px';
        child_e[i].style.left = leftPos + '%';
        column_matrix[addToCol] = column_matrix[addToCol] + (child_e[i].getBoundingClientRect()
          .height) + gutter_h;
      }
      element.style.height = Array.max(column_matrix) + 'px';
    },
    destroy: function() {
      for (var i = 0; i < child_e.length; i++) {
        child_e[i].style.position = '';
        child_e[i].style.top = '';
        child_e[i].style.left = '';
      }
    }
  };
  element.classList.add('sm-loaded');
  window.addEventListener('load', flex_magic.render);

  function minIndex(arry) {
    //console.log(arry);
    if (arry.length > 1) {
      var minValue = Math.min.apply(Math, arry);
      return arry.indexOf(minValue, arry);
    } else {
      return 0;
    }
  }
  window.addEventListener('resize', function() {
    flex_magic.render();
  });
  window.onclick = function(event) {
    event.preventDefault();
    flex_magic.destroy();
  };
};
