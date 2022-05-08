$(".hidebox h2").click(function () {
	$(this).next("p").hide("slow");
});
$(".hidebox h2").dblclick(function () {
	$(this).next("p").show("slow");
});