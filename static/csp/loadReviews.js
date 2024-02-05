function load_reviews()
    {
        var offset = $('#offset').val();
        $.post('load-reviews.php',
        {
            'action': 'load',
            'offset': offset,
        },
        function (res) 
        {
            // console.log(res);
            if ($('#offset').val() ==  0)
                $("#reviews_container").html(res.response);
            else
                $("#reviews_container").append(res.response);

            $('#offset').val(res.last_id);

        },'JSON');
    }
    $(document).ready(function() {
        $("#toggle").click(function() {
            load_reviews();
        });
    });