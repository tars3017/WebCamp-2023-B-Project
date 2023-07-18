
class Comment {
    constructor(name, text, courseName, prof) {
        this.name = name;
        this.text = text;
        this.courseName = courseName;
        this.prof = prof;
        // this.date = date;
        // this.time = time;
    }
}
let a = new Comment("XXX", "Good!", "AAA", "123");
let b = new Comment("YYY", "Bad", "BBB", "456");
let c = new Comment("ZZZ", "~~", "AAA", "123");

let comments = [a, b, c];

$(window).ready(() => {
    console.log('Document Loaded');
    let printed = [];
    comments.forEach(oneCom => {
        if (!printed.find(x => x === oneCom.courseName + oneCom.prof)) {
            let count = comments.filter(x=>x.courseName === oneCom.courseName).filter(x=>x.prof === oneCom.prof).length;
            $('#commentList').append(`<div class="commentBar">
    	課程名稱: ${oneCom.courseName}<br>
	 	開課教授: ${oneCom.prof}<br>
   		有 ${count} 則評論
  	</div>`);
            printed.push(oneCom.courseName + oneCom.prof);
        }
    });

});

$('.commentBar').click(() => {
    console.log('Find one bar');
});