var app = new Vue({
	el: '#remi',	
	data: function(){
		// initial scores
		
		let initNamas = {nm1: null, nm2: null, nm3: null, nm4: null};
		if(this.$cookies.isKey('namas')) {
			initNamas = this.$cookies.get('namas');
		}		
		let initScores = [{sc1: null, sc2: null, sc3: null, sc4: null}];
		if(this.$cookies.isKey('scores')) {
			initScores = JSON.parse(this.$cookies.get('scores'));
		}
		return {
			scores: initScores,
			namas: initNamas
		}
	},
	computed: {
		total1() {
          return this.scores.reduce((total, score) => {			
            return total + Number(score.sc1);
          }, 0);
        },		
		total2() {
          return this.scores.reduce((total, score) => {
            return total + Number(score.sc2);
          }, 0);
        },		
		total3() {
          return this.scores.reduce((total, score) => {
            return total + Number(score.sc3);
          }, 0);
        },		
		total4() {
          return this.scores.reduce((total, score) => {
            return total + Number(score.sc4);
          }, 0);
        },		
	},
	methods: {
		storeNama() {
			this.$cookies.set('namas', this.namas);
		},
		storeScore() {			
			this.$cookies.set('scores', JSON.stringify(this.scores));
		},
		addRow() {
			this.scores.push({
				sc1: null, sc2: null, sc3: null, sc4: null
			});		
			window.scrollTo(0,this.$el.querySelector('.score-wrap').scrollHeight);
		},
		clearAll() {

			if(confirm('Semua nilai akan dihapus. Sudah yaqinkah anda?')) {
				
				this.$cookies.remove('namas');
				this.$cookies.remove('scores');
				this.scores = [
					{sc1: null, sc2: null, sc3: null, sc4: null}
				];
				this.namas = {nm1: null, nm2: null, nm3: null, nm4: null};				
			}			
		},
		resClass: function(val) {
			let classes = [];
			let highest = Math.max(this.total1, this.total2, this.total3, this.total4);
			let lowest = Math.min(this.total1, this.total2, this.total3, this.total4);
			if(val == lowest) {
				classes.push('red');
			}
			if(val == highest) {
				classes.push('green');
			}
			return classes;
		},
		colClass: function(index, num) {
			let classes = [];
			let sc1Tot = 0, sc2Tot = 0, sc3Tot = 0, sc4Tot = 0;
			for(i = 0; i <= index; i++) {
				sc1Tot += this.scores[i].sc1;
				sc2Tot += this.scores[i].sc2;
				sc3Tot += this.scores[i].sc3;
				sc4Tot += this.scores[i].sc4;
			}
			let highest = Math.max(sc1Tot, sc2Tot, sc3Tot, sc4Tot);
			let lowest = Math.min(sc1Tot, sc2Tot, sc3Tot, sc4Tot);
			
			let highCond = ( (num == 1 && highest == sc1Tot) 
							|| (num == 2 && highest == sc2Tot)
							|| (num == 3 && highest == sc3Tot)
							|| (num == 4 && highest == sc4Tot)
							);
							
			let lowCond = ( (num == 1 && lowest == sc1Tot) 
							|| (num == 2 && lowest == sc2Tot)
							|| (num == 3 && lowest == sc3Tot)
							|| (num == 4 && lowest == sc4Tot)
							);
			
			if(highCond) {
				classes.push('green');
			}
			if(lowCond) {
				classes.push('red');
			}		
			
			return classes;
		}
	}  
});