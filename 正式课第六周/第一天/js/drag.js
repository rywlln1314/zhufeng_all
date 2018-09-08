function dragStart(e) {
    e = e || window.event;
    this.mx = e.pageX;
    this.my = e.pageY;
    this.startX = e.offsetLeft;
    this.startY = e.offsetTop;
    document.onmousemove = dragMove.bind(this);
    document.onmouseup = dragEnd.bind(this);
}
function dragMove(e) {
    e = e || window.event;
    var l = e.pageX - this.mx + this.startX;
    var t = e.pageY - this.my + this.startY;
    this.style.left = l + 'px';
    this.style.top = t + 'px';
}
function dragEnd() {
    document.onmousemove = null;
    document.onmouseup = null;
}