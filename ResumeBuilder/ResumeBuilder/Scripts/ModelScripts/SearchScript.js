﻿$(document).ready(function () {

    $('#searchTable tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    var table = $("#searchTable").DataTable({
        ajax: {
            url: "/SearchUser/GetUser",
            type: "GET",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            dataSrc: function (res) {
                console.log(res);
                return res;
            }
        },
        columns: [
            {
                data: "UserID"
            },
            {
                data: "UserName"
            },
            {
                data: "SkillNames"
            }
        ]
    });

    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change clear', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
});