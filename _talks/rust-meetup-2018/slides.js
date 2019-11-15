$(document).ready(function() {
    const headings = $("h1, h2").toArray();
    //console.log(headings);
    $(document).keydown(function(e) {
        const position = $("body").scrollTop();
        //console.log(position);
        if (e.keyCode === 39) {
            let head = headings.find(function(element) {
                //console.log($(element).position());
                return $(element).position().top > position;
            });
            //console.log(head);
            const scroll = (head === undefined) ? 0 : $(head).position().top + 750;

            $("html, body").animate({
                scrollTop: scroll
            }, 0);
        }
        if (e.keyCode === 37) {
            let head = Array.from(headings).reverse().find(function(element) {
                //console.log($(element).position());
                return $(element).position().top < position-750;
            });
            const handleTop = (position === 0) ? $(document).height() : 0;
            //console.log(head);
            const scroll = (head === undefined) ? handleTop : $(head).position().top + 750;
            $("html, body").animate({
                scrollTop: scroll
            }, 0);
        }
    });
});
