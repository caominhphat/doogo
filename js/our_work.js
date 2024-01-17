    // Dropdown on mouse hover
    $(document).ready(function () {

        // Get list our works
        getListOurWork();
    });

    // Get list our works
    function getListOurWork() {
        $.ajax({
            url: "https://doogomedia.com.vn/api/our-work/list-app",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if(data.status == 200 && data.data) {
                    let our_works = data.data

                    let our_work_item_content_root = document.getElementById("our_work_content").innerHTML
                    let item_first_class = "gdlr-core-item-list  gdlr-core-column-20 gdlr-core-column-first"
                    let item_class = "gdlr-core-item-list  gdlr-core-column-20"

                    let our_work_content = ''
                    $.each(our_works, function (index, our_work) {
                        let item_html = our_work_item_content_root
                        if (index == 0) {
                            item_html = item_html.replace("item_class", item_first_class)
                        } else {
                            item_html = item_html.replace("item_class", item_class)
                        }

                        let images = our_work.images
                        let our_work_item_content = ""
                        $.each(images, function (image_index, image) {
                            if(image.is_default) {
                                our_work_item_content = item_html.replaceAll("upload/shutterstock_204682738-400x533.webp", image.image_url)
                                our_work_item_content = our_work_item_content.replaceAll("upload/shutterstock_143257204-400x533.webp", image.image_url)
                                our_work_item_content = our_work_item_content.replace("Black White Fashion Set", our_work.name)
                            }
                        });
                        if(our_work_item_content == "" && images.length > 0) {
                            our_work_item_content = item_html.replaceAll("upload/shutterstock_204682738-400x533.webp", images[0].image_url)
                            our_work_item_content = our_work_item_content.replaceAll("upload/shutterstock_143257204-400x533.webp", images[0].image_url)
                            our_work_item_content = our_work_item_content.replace("Black White Fashion Set", our_work.name)
                        }
                        our_work_content += our_work_item_content
                    });
                    document.getElementById("our_work_content").innerHTML = our_work_content;
                }

            },
            error: function (error) {
                console.log(error)
            }
        });
    }


