var MAX_DISTANCE = 300;

var draggable = document.getElementById('draggable');

Draggable.create(draggable, {
  onDrag:function(e) {
    var x = this.target._gsTransform.x,
        y = this.target._gsTransform.y,
        distance = Math.sqrt(x * x + y * y);
    
    if (distance > MAX_DISTANCE) {
    	 this.endDrag(e);
    }
  },
  onDragEnd:function() {
    TweenMax.to(draggable, 1, {x:0, y:0, ease:Elastic.easeOut});
  }
});