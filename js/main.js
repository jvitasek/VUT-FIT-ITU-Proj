/**
 * @var member: Object -> struktura obsahující všechny studenty a jejich recenze
 * ##########################
 * login: memberData[login]
 */

/**
 * @var memberData: array[27] -> struktura obsahující dvě recenze pro daného studenta (klíč)
 * ##########################
 * 0: Váš login (B) -> TEXT
 * 1: Login autora recenzované technické zpravy (D) -> TEXT
 * 2: Celková obsahová kvalita (E) -> TEXT
 * 3: Definice cílů rozhraní (F) –> NUM
 * 4: Formální a jazyková úroveň (G) -> TEXT
 * 5: Celková obsahová kvalita (škála) (H) -> NUM
 * 6: Zaměření řešení (I) -> TEXT
 * 7: Zaměření řešení (škála) (J) -> NUM
 * 8: Technická úroveň (K) -> TEXT
 * 9: Technická úroveň (škála) (L) -> NUM
 * 10: Návrh testování (M) -> TEXT
 * 11: Návrh testování (škála) (N) -> NUM
 * 12: Doporučení pro autora (O) -> TEXT
 * 13: Studium uživatelů (P) -> NUM
 * 14: Studijní literatura (Q) -> NUM
 * 15: Existující aplikace a podobná řešení (R) -> NUM
 * 16: Formální a jazyková úroveň (škála) (S) -> NUM
 * 17: Studium návrhu a tvorby GUI (T) -> NUM
 * 18: Studium testování (U) -> NUM
 * 19: Doporučení ke studiu (V) -> TEXT
 * 20: Návrh GUI (W) -> NUM
 * 21: Doporučení k návrhu (X) -> TEXT
 * 22: Návrh testování (Y) -> NUM
 * 23: Kolik variant rozhraní autor navrhuje? (Z)
 * 24: Pilotní test (AA) -> NUM
 * 25: Vybrané technologie (AB) -> NUM
 * 26: Back-endu a API (AC) -> NUM
 */


$('document').ready(function(){
	$('#content-1').hide();
	$('#content-2').hide();
	$('#label-member1').hide();
	$('#label-member2').hide();
	$('#label-member3').hide();
	$('#links-1').hide();
	$('#links-2').hide();
	$('#links-3').hide();

	/**
	 * The user has put in the name of the team in the
	 * searchbox.
	 */
	$('#team-search').keypress(function(e){
		if(e.which == 13){ // ENTER
			$('#label-member1').hide();
			$('#label-member2').hide();
			$('#label-member3').hide();
			$('#links-1').hide();
			$('#links-2').hide();
			$('#links-3').hide();
			var teamName = $('#team-search').val();
			$.getJSON('./json/newteams.json', function(data) {
				teamMembers = data['Tým ' + teamName];
				var index = 1;
				$.each(teamMembers, function(key, value){
					$('#label-member' + index).text(value);
					$('#label-member' + index).show();
					$('#member-' + index + '-pdf-1').attr('href', './files/c1/' + value + '/' + value + '.pdf');
					$('#member-' + index + '-pdf-2').attr('href', './files/c2/' + value + '/' + value + '.pdf');
					$('#member-' + index + '-pdf-3').attr('href', './files/c3/' + value + '/' + value + '.pdf');
					$('#links-' + index).show();
					index += 1;
				});
			});
			$('#content-1').show();
		}
	});

	function reset(index) {
		$('#final-kvalita-' + index).text("");
		$('#final-mnozstvi-' + index).text("");
		$('#final-celkove-' + index).text("");
		$('#reviewee-' + index).text("");
		$('#stud-cile-' + index).text("");
		$('#stud-uziv-' + index).text("");
		$('#stud-navrh-' + index).text("");
		$('#stud-literatura-' + index).text("");
		$('#stud-exist-' + index).text("");
		$('#stud-testovani-' + index).text("");
		$('#stud-doporuceni-' + index).text("");
		$('#navrh-gui-' + index).text("");
		$('#navrh-varianty-' + index).text("");
		$('#navrh-testovani-' + index).text("");
		$('#navrh-pilot-' + index).text("");
		$('#navrh-doporuceni-' + index).text("");
		$('#impl-tech-' + index).text("");
		$('#impl-be-api-' + index).text("");
		$('#obsah-' + index).text("");
		$('#obsah-doporuceni-' + index).text("");
		$('#jazyk-' + index).text("");
		$('#jazyk-doporuceni-' + index).text("");
		$('#zamereni-' + index).text("");
		$('#zamereni-doporuceni-' + index).text("");
		$('#tech-ur-' + index).text("");
		$('#tech-ur-doporuceni-' + index).text("");
		$('#testovani-' + index).text("");
		$('#testovani-doporuceni-' + index).text("");
		$('#doporuceni-' + index).text("");
		$('#rec-kvalita-' + index).text("");
		$('#rec-prinos-' + index).text("");
		$('#rec-souhlas-' + index).text("");
		$('#rec-vyjadreni-' + index).text("");
	}

	/**
	 * The user has chosen a team member to view.
	 */
	$('.label-member').click(function(e){
		var member = e.currentTarget.innerText;
		$('#label-member1').removeClass('active');
		$('#label-member2').removeClass('active');
		$('#label-member3').removeClass('active');
		$(e.currentTarget).addClass('active');
		reset(1);
		reset(2);
		$.getJSON('./json/newreviews.json', function(data) {
			var memberData = data[member];
			var index = 1;
			$.each(memberData, function(key, value){

				/**
				 * RECENZENT - KVALITA
				 */
				
				// 3,5,7,9,11,13,16,17,18,20,22,25,26
				var quality = value[3] + value[5] + value[7] +
					value[9] + value[11] + value[13] +
					value[16] + value[17] + value[18] +
					value[20] + value[22] + value[25] +
					value[26];
				
				quality = quality/1.3;
				qualityRounded = Math.round(quality);
				$('#final-kvalita-' + index).text(qualityRounded);

				/**
				 * RECENZENT - MNOZSTVI
				 */
				
				var quantity = (value[14]>0?25:0) + (value[15]>0?25:0) + (value[23]>0?25:0) + (value[24]>0?25:0);
				$('#final-mnozstvi-' + index).text(quantity);

				/**
				 * RECENZENT - CELKOVE
				 */
				
				var total = (2*quality+quantity)/3;
				$('#final-celkove-' + index).text(Math.round(total));


				/**
				 * CILE A STUDIUM
				 */

				// rating (cile a studium)
				$('#reviewee-' + index).text(value[0]);
				$('#stud-cile-' + index).text(value[3]);
				$('#stud-uziv-' + index).text(value[13]);
				$('#stud-navrh-' + index).text(value[17]);
				$('#stud-literatura-' + index).text(value[14]);
				$('#stud-exist-' + index).text(value[15]);
				$('#stud-testovani-' + index).text(value[18]);

				// studijni doporuceni
				$('#stud-doporuceni-' + index).text(value[19]);

				/**
				 * NAVRH A ZPRACOVANI
				 */

				// rating (navrh a zprac)
				$('#navrh-gui-' + index).text(value[20]);
				$('#navrh-varianty-' + index).text(value[23]);
				$('#navrh-testovani-' + index).text(value[22]);
				$('#navrh-pilot-' + index).text(value[24]);

				// navrh doporuceni
				$('#navrh-doporuceni-' + index).text(value[21]);

				/**
				 * REALIZACE
				 */
				
				// rating (realizace)
				$('#impl-tech-' + index).text(value[25]);
				$('#impl-be-api-' + index).text(value[26]);

				/**
				 * OBSAH
				 */
				
				// rating (obsah)
				$('#obsah-' + index).text(value[5]);

				// obsah doporuceni
				$('#obsah-doporuceni-' + index).text(value[2]);

				/**
				 * JAZYK
				 */
				
				// rating (jazyk)
				$('#jazyk-' + index).text(value[16]);

				// jazyk doporuceni
				$('#jazyk-doporuceni-' + index).text(value[4]);

				/**
				 * ZAMERENI
				 */
				
				// rating (zamereni)
				$('#zamereni-' + index).text(value[7]);

				// zamereni doporuceni
				$('#zamereni-doporuceni-' + index).text(value[6]);

				/**
				 * TECHNICKA UROVEN
				 */
				
				// rating (technicka uroven)
				$('#tech-ur-' + index).text(value[9]);

				// technicka uroven doporuceni
				$('#tech-ur-doporuceni-' + index).text(value[8]);

				/**
				 * TESTOVANI
				 */
				
				// rating (testovani)
				$('#testovani-' + index).text(value[11]);

				// testovani doporuceni
				$('#testovani-doporuceni-' + index).text(value[10]);

				/**
				 * DOPORUCENI
				 */

				// doporuceni
				$('#doporuceni-' + index).text(value[12]);

				index += 1;
			});
		});
		$.getJSON('./json/feedbacks.json', function(data) {
			var memberFeedback = data[member];
			var index = 1;
			$.each(memberFeedback, function(key, value){

				/**
				 * VYJADRENI
				 */
				
				// rating (vyjadreni)
				$('#rec-kvalita-' + index).text(value[1]);
				$('#rec-prinos-' + index).text(value[2]);
				$('#rec-souhlas-' + index).text(value[3]);

				// vyjadreni
				$('#rec-vyjadreni-' + index).text(value[4]);

				index += 1;
			});
		});
		$('#content-2').show();
		$.getJSON('./json/count.json', function(data) {
			countReviews = data[member];
			var count = 0;
			$.each(countReviews, function(key, value){
				count += 1;
			});
			$('#member-reviews').text(count);
		});
	});
});