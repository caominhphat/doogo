    // Dropdown on mouse hover
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

                    // let concept_content = ""
                    // $.each(concepts, function (index, item) {
                    //     let concept = '<div class=" item">' +
                    //         // '<div class="numbertext">' + (index + 1) + '/' + concepts.length + '</div>' +
                    //         '<img src="' + item.image_url + '">' +
                    //         '<div class="mySlideText"><span class="concept-title">' + item.name + '</span><p>' + item.description + '</p></div>' +
                    //         '</div>'
                    //     concept_content += concept
                    // });
                    // // concept_content += '<a class="prev" onclick="plusSlides(-1)">❮</a>'
                    // // concept_content += '<a class="next" onclick="plusSlides(1)">❯</a>'
                    // $("#concept_content").html(concept_content);


                    $('#concept_content').html('<div id="testing" class="owl-carousel owl-theme"></div>');
                    $.each(concepts, function (index, item) {
                        let concept = '<div class=" item">' +
                            // '<div class="numbertext">' + (index + 1) + '/' + concepts.length + '</div>' +
                            '<img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTkyMHgxMDgwfGVufDB8fDB8fHww">' +
                            // '<img src="' + item.image_url + '">' +
                            '<div class="mySlideText"><span class="concept-title">' + item.name + '</span><p>' + item.description + '</p></div>' +
                            '</div>'
                        //concept_content += concept
                        $(".owl-carousel").append(concept);
                    });

                    var owl = $("#testing");


                    owl.owlCarousel({
                        // loop:true,
                        items:1,
                        // autoplay:true,
                        // autoplayTimeout:4000,
                        dots:true,
                    });
                }

            },
            error: function (error) {
                console.log(error)
            }
        });
    }



