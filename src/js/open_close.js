const openInstruments = () =>{
	$('.instruments').addClass('opened');
}
$('.close').click(function (){
	$('.instruments').removeClass('opened');
})