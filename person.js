
function dtr(degrees) { return degrees * (Math.PI / 180);
}

function getMoonPhase(year, month, day,hemisphere){ var c = e = jd = b = 0;

        if (month < 3) { year--; month += 12;
        }

        ++month;

        c = 365.25 * year;

        e = 30.6 * month;

        jd = c + e + day - 694039.09; //jd is total days elapsed

        jd /= 29.5305882; //divide by the moon cycle

        b = parseInt(jd); //int(jd) -> b, take integer part of jd

        jd -= b; //subtract integer part to leave fractional part of original jd

        b = Math.round(jd * 8); //scale fraction from 0-8 and round

        if (b >= 8 ) { b = 0; //0 and 8 are the same so turn 8 into 0
        }

        // 0 => New Moon 1 => Waxing Crescent Moon 2 => Quarter Moon 3 => Waxing
        // Gibbous Moon 4 => Full Moon 5 => Waning Gibbous Moon 6 => Last
        // Quarter Moon 7 => Waning Crescent Moon 8 => New Moon

        if(hemisphere){ b = 8-b; } return b;
    }

function drawMoonImage(moon){
  var moon_image =
  new Image();

  moon_image.onload =
  function(){ ctx.drawImage(moon_image,150-54,150-54,230,179); }
  moon_image.src='moons/'+moon+'.svg';
}

function drawMoonPhase(phase){ switch (phase) { case 0: drawMoonImage('new');
break; case 1: drawMoonImage('waxing_cressent'); break;

    case 2: drawMoonImage('first_quarter'); break;

    case 3: drawMoonImage('waxing_gibbous'); break;

    case 4: drawMoonImage('full'); break;

    case 5: drawMoonImage('waning_gibbous'); break;

    case 6: drawMoonImage('last_quarter'); break;

    case 7: drawMoonImage('waning_cressent'); break;

    case 8: drawMoonImage('new'); break;
  }
}

function arc(x=150,y=150,radius=80,start_angle_degrees=0,end_angle_degrees=360,color_hex='#000000',cap_style='round'){
    ctx.lineCap = cap_style; ctx.strokeStyle = color_hex; ctx.beginPath();
    ctx.arc(x,y, radius, dtr(start_angle_degrees), dtr(end_angle_degrees));
    ctx.stroke();
}

var c =
document.getElementById('symbol');

var ctx =
c.getContext('2d');

const letters =
['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const
month_element=['earth','air','water','fire','earth','air','water','fire','earth','air','water','fire'];

const month_color
=['#3c6823','#4eb5ed','#405ED6','#f7892E','#3c6823','#4eb5ed','#405ED6','#f7892E','#3c6823','#4eb5ed','#405ED6','#f7892E'];

function generate(){
      var male =
      document.getElementById('male-true').checked;

      var birthdate =
      document.getElementById('birthdate').value.split('-');

      var month_ring =
      (birthdate[1]*360)/12;

      var day_ring =
      (birthdate[2]*360)/31;

      var hem_southern =
      document.getElementById('hemisphere').checked;

      var firstname = document.getElementById('fn').value; var lastname =
      document.getElementById('ln').value; var letters_in_name =[];

      ctx.clearRect(0,0,300,300); ctx.lineWidth = 10

      arc(150,150,30,0,day_ring,month_color[Number(birthdate[1])-1]);

      arc(150, 150, 39, 0, month_ring,month_color[Number(birthdate[1])-1])

      arc(150, 150, 90, 0, 360,month_ring,month_color[Number(birthdate[1])-1])

      arc();

      // draws the gender arcs
      for(let i = 0; i<4;i++){
      // draws the base four arcs
        arc(150, 150, 70, 45+90*i, 45+90*i+2,'#000000','square');

        //draws the extra arc for males
        if (male) { arc(150, 150, 70, 270,272,'#000000','square');}
      }

      /* loops through all the letters in letters checks if the firstname +
         lastname include any of the letters when it does it added their index
         to letters_in_name*/

      for(let i = 0; i< letters.length;i++){ let to_check =
      (firstname+lastname).toString().toLowerCase();

        if(to_check.includes(letters[i])){ letters_in_name.push(i);
        }
      }

      /* draws the arcs on the outside based on the index of the letter timesed
         by a segment_size that = 360/26*/
         for(let i = 0 ; i<letters_in_name.length;i++){
           var segment_size =
           360/26;
           arc(150, 150,99, letters_in_name[i]*segment_size,letters_in_name[i]*segment_size+10,
             month_color[Number(birthdate[1])-1],'square');
      }

      // draws the moon for the person
      drawMoonPhase(getMoonPhase(birthdate[0],birthdate[1],birthdate[2],hem_southern));
      console.log(getMoonPhase(birthdate[0],birthdate[1],birthdate[2],hem_southern));
    }
