    $(document).ready(function () {

        // Get list concepts
        getListConcept();
    });

    // Get list concepts
    function getListConcept() {
        $.ajax({
            url: "https://doogomedia.com.vn/api/concept/list-app",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if(data.status == 200 && data.data) {
                    concepts = data.data

                    $('#concept_content').html('<div id="testing" class="owl-carousel owl-theme"></div>');
                    $.each(concepts, function (index, item) {
                        let concept = '<div class=" item">' +
                            // '<div class="numbertext">' + (index + 1) + '/' + concepts.length + '</div>' +
                            '<img src="'+ item.image_url +'">' +
                            // '<img src="' + item.image_url + '">' +
                            '<div class="mySlideText"><span class="concept-title">' + item.name + '</span><p>' + item.description + '</p></div>' +
                            '</div>'
                        //concept_content += concept
                        $(".owl-carousel").append(concept);
                    });

                    var owl = $("#testing");

                    owl.owlCarousel({
                        loop:true,
                        items:1,
                        autoplay:true,
                        autoplayTimeout:2000,
                        dots:true,
                    });
                }

            },
            error: function (error) {
                console.log(error)
            }
        });
    }



