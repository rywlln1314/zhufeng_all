function dragStart(e) {
    e=e||window.event;
    this.startX=this.offsetLeft;
    this.startY=this.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    this.dragMove=dragMove.bind(this);
    this.dragEnd=dragEnd.bind(this);
    on(document,'mousemove',this.dragMove);
    on(document,'mouseup',this.dragEnd);
    fire(this,'myIndex')
}
function dragMove(e) {
    e=e||window.event;
    e.preventDefault();
    let x=e.pageX-this.mx,
        y=e.pageY-this.my;
    this.style.left=this.startX + x + 'px';
    this.style.top=this.startY + y + 'px';
    fire(this,'myHit')
}
function dragEnd() {
    off(document,'mousemove',this.dragMove);
    off(document,'mouseup',this.dragEnd);
    fire(this,'myChangePos');
}
