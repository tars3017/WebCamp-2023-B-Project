
class Comment {
    constructor(text, courseName, prof, year, month, date) {
        // this.name = name;
        this.text = text;
        this.courseName = courseName;
        this.prof = prof;
        this.date = date;
        this.month = month;
        this.year = year;
        // this.time = time;
    }
}
let a = new Comment("Good!", "AAA", "123", "2021", "10", "10");
let b = new Comment("Bad", "BBB", "456", "2022", "7", "3");
let c = new Comment("~~", "AAA", "123", "2023", "7", "4");

let comments = [a, b, c];

function showCommentList() {
    $('#commentList').empty();
    $('#commentDetail').hide();
    $('#commentList').show();
    $('#otterFormGroup').hide();

    let printed = [];
    comments.forEach(oneCom => {
        if (!printed.find(x => x === oneCom.courseName + oneCom.prof)) {
            let count = comments.filter(x=>x.courseName === oneCom.courseName).filter(x=>x.prof === oneCom.prof).length;
            $('#commentList').append(`<div class="commentBar" courseName="${oneCom.courseName}" prof="${oneCom.prof}" onmouseover="this.style.cursor='pointer';">
    	課程名稱: ${oneCom.courseName}<br>
	 	開課教授: ${oneCom.prof}<br>
   		有 ${count} 則評論
  	</div>`);
            printed.push(oneCom.courseName + oneCom.prof);

        }
    });
    $('.commentBar').each(function() {
        // $(this).css('overflow', 'auto');
        // $(this).animate({height: 'auto'}, 1000);
        $(this).click(function () {
            let nowProf = $(this)[0].getAttribute("prof");
            let nowCourseName = $(this)[0].getAttribute("courseName");
            $('#commentList').hide();
            showCommentDetail(nowProf, nowCourseName);
        });
    })
}

function showCommentDetail(nowProf, nowCourseName) {
    $('#commentDetail').empty();
    $('#commentDetail').show();
    comments.forEach(oneCom=> {
        if (oneCom.courseName === nowCourseName && nowProf === oneCom.prof) {
            $('#commentDetail').append(`<div class="commentBar" onmouseover="this.style.cursor='default';">
				<div class="commentTime">${oneCom.year}/${oneCom.month}/${oneCom.date}</div>
				<div class="commentContent">
                課程名稱: ${oneCom.courseName}<br>
                開課教授: ${oneCom.prof}<br><br>
                ${oneCom.text}
 				</div>
            </div>`);
        }
    });
    $('#commentDetail').append(
        `<img src="https://briian.com/wp-content/uploads/2014/08/backbutton_0-200x198.png" 
  			  alt="backButton"
	   		  width="50" id="backButton"/>`
    );

    $('#backButton').click(function() {
        $(this).hide();
        showCommentList();
    });
}
$(window).ready(() => {
    console.log('Document Loaded');

    const windowWidth = $(window).width();
    $('#searchInput').css('width', `${windowWidth - 250}px`)

    $('#otterFormGroup').hide();
    showCommentList();
});

$('form').submit((event) => {
    event.preventDefault();
    const searchText = $('#searchInput').val().trim();

    if (searchText === '') {
        alert('請輸入課程名稱!')
        $('.commentBar').show();
        return;
    }

    $('.commentBar').hide();

    let courseFound = false;

    comments.forEach(oneCom => {
        if (oneCom.courseName.includes(searchText)) {
            const selector = `div.commentBar:contains("${oneCom.courseName}")`;
            $(selector).show();
            courseFound = true;
        }
    });

    if (!courseFound) {
        alert('無該課程!');
        $('.commentBar').show();
    }

});

$('#submitButton').click(function() {
    const nowCourseName = $('#courseInput').val().trim();
    const nowProf = $('#professorInput').val().trim();
    const nowText = $('#commentInput').val().trim();
    if (nowCourseName === '' || nowProf === '' || nowText === '') {
        alert('評論不完整!');
        return ;
    }
    $('#courseInput').val('');
    $('#professorInput').val('');
    $('#commentInput').val('');

    let nowDate = new Date();
    let nowComment = new Comment(nowText, nowCourseName, nowProf, nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
    comments.push(nowComment);
    showCommentList();
});


function handleClick() {
    $('#otterFormGroup').slideToggle();
}