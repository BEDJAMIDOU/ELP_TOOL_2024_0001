

const THREE = require('three');

////////////////////////////////////////////////////////////////////////////// OFFSETS STRUCTURE CUBIQUE//////////////////////////

function Z2_SP(X, Y, X0_1, Y0_1, Z0_1, Rayon) {

    const Rayon_p = 0.;


    if (Z0_1<=Rayon_p ) {

        var Rayon_P_M_S = Math.sqrt(Math.pow(Rayon,2)+2*Rayon_p*Rayon+2*Rayon_p*Z0_1 - Math.pow(Z0_1,2));

    } else {

        Rayon_P_M_S =(Rayon_p+Rayon);

    } 

    r = Math.sqrt(Math.pow(X - X0_1,2) + Math.pow(Y - Y0_1,2));

    if (r<=Rayon_P_M_S) {

        Z2_SPP=Z0_1 + (Rayon_p+Rayon) * Math.sin(Math.acos(r / (Rayon_p+Rayon)));
        Z2_SPP0=Z0_1 + (Rayon) * Math.sin(Math.acos(r / (Rayon_p+Rayon)));

    } else {

        Z2_SPP=Rayon_p;
        Z2_SPP0=0.;

    }



    return {Z2_SPP,Z2_SPP0};
  
 


}

function Z2_CY_SP(X, Y, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon) {

    const Rayon_p = 0.;

if (Hauteur_bat_1<=Rayon_p ) {

    var Rayon_P_M_S = Math.sqrt(Math.pow(Rayon,2)+2*Rayon_p*Rayon+2*Rayon_p*Hauteur_bat_1 - Math.pow(Hauteur_bat_1,2));

} else {

    Rayon_P_M_S =(Rayon_p+Rayon);

} 

r = Math.sqrt(Math.pow(X - X0_1,2) + Math.pow(Y - Y0_1,2));

if (r<=Rayon_P_M_S) {

    Z2_CY_SPP=Hauteur_bat_1 + (Rayon_p+Rayon) * Math.sin(Math.acos(r / (Rayon_p+Rayon)));
    Z2_CY_SPP0=Hauteur_bat_1 + (Rayon) * Math.sin(Math.acos(r / (Rayon+Rayon_p)));

} else {

    Z2_CY_SPP=Rayon_p;
    Z2_CY_SPP0=0;

}



return {Z2_CY_SPP,Z2_CY_SPP0};




}


function Z2_CY(X, Y, X0_1, Y0_1, Z0_1, Hauteur_bat_1,Rayon_sup,Rayon_inf) {

    const Rayon_p = 0.;

    r = Math.sqrt(Math.pow(X - X0_1,2) + Math.pow(Y - Y0_1,2));

    if (Rayon_sup===Rayon_inf) {

        alpha=Math.PI/2;


    } else {

        alpha=Math.atan((Hauteur_bat_1-Z0_1)/Math.abs(Rayon_sup-Rayon_inf));

    }

    if (Rayon_sup>=Rayon_inf) {

        if (r>=0 && r<Rayon_sup) {

            Z2_CYY=Hauteur_bat_1+Rayon_p;
            Z2_CYY0=Hauteur_bat_1;
            

        } else if (r>=Rayon_sup && r<=Rayon_p+Rayon_sup) {

            Z2_CYY=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos((r-Rayon_sup)/Rayon_p));
            Z2_CYY0=Hauteur_bat_1;

        } else {

            Z2_CYY=Rayon_p;
            Z2_CYY0=0.;
        }



    } else {

    

    if (r>=0 && r<Rayon_sup) {

        Z2_CYY=Hauteur_bat_1+Rayon_p;
        Z2_CYY0=Hauteur_bat_1;

    } else if (r>=Rayon_sup && r < Rayon_p*Math.sin(alpha)+Rayon_sup) {

        Z2_CYY=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos((r-Rayon_sup)/Rayon_p));
        Z2_CYY0=Hauteur_bat_1;

    } else if (r>=Rayon_inf+Rayon_p*Math.sin(alpha) && r <= Rayon_p+Rayon_inf) {

        Z2_CYY=Z0_1+Rayon_p*Math.sin(Math.acos((r-Rayon_inf)/Rayon_p));
        Z2_CYY0=Z0_1;

    } else if (r>Rayon_p*Math.sin(alpha)+Rayon_sup && r<Rayon_inf+(Rayon_p)*Math.sin(alpha)) {

        Zi=(r-Rayon_sup-Rayon_p*Math.sin(alpha))/Math.cos(alpha);

        Zf=Zi*Math.sin(alpha)-Rayon_p*Math.cos(alpha);

        Z2_CYY=Hauteur_bat_1-Zf; 
        Z2_CYY0=Hauteur_bat_1-Zi*Math.sin(alpha);


    } else {

        Z2_CYY=Rayon_p;
        Z2_CYY0=0.;


    }




    }


    return {Z2_CYY,Z2_CYY0};

}

function Z2_CYH (X1, Y1, X0_1, Y0_1,Z0_1, Longueur_bat_1,Rayon,alpha) {
   
    const Rayon_p = 0.;
   var Z2_CYHH=Rayon_p;
   var Z2_CYHH0;
   

   alpha=alpha*Math.PI/180;
   X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
   Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

   r = Math.sqrt(Math.pow(X_R - X0_1,2) + Math.pow(Y_R - Y0_1,2));

   XO = X0_1 - Longueur_bat_1 / 2;
   XE = X0_1 + Longueur_bat_1 / 2;
   XORR = X0_1 - Longueur_bat_1 / 2 - Rayon_p;
   XER = X0_1 + Longueur_bat_1 / 2 + Rayon_p;
   YNR = Y0_1+ Rayon + Rayon_p;
   YSR = Y0_1 - Rayon - Rayon_p;



if (X_R >= XO && X_R<=XE && Y_R >= YSR && Y_R <=YNR) {

    Z2_CYHH=Z0_1+(Rayon_p+Rayon)*Math.sin(Math.acos((Y_R-Y0_1)/(Rayon_p+Rayon)));
    Z2_CYHH0=Z0_1+(Rayon)*Math.sin(Math.acos((Y_R-Y0_1)/(Rayon_p+Rayon)));
   
} else if (X_R >= XE && X_R<=XER && Y_R >= YSR && Y_R <=YNR) {

       var Z_bat=Rayon+(Rayon_p)*Math.sin(Math.acos(Math.abs(X_R-(X0_1+Longueur_bat_1/2))/Rayon_p))

       if (Math.abs(Y_R-Y0_1) >= 0 && Math.abs(Y_R-Y0_1) <=Z_bat) {

        Z2_CYHH=Z_bat*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Z0_1;
        Z2_CYHH0=Rayon*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Z0_1;

       }

   




} else if (X_R >= XORR && X_R<=XO && Y_R >= YSR && Y_R <=YNR) {

       var Z_bat=Rayon+(Rayon_p)*Math.sin(Math.acos(Math.abs(X0_1-Longueur_bat_1/2-X_R)/Rayon_p))

       if (Math.abs(Y_R-Y0_1) >= 0 && Math.abs(Y_R-Y0_1) <=Z_bat) {

        Z2_CYHH=Z_bat*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Z0_1;
        Z2_CYHH0=Rayon*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Z0_1;


       }




} else {

    Z2_CYHH=Rayon_p;
    Z2_CYHH0=0.;


}



return {Z2_CYHH,Z2_CYHH0};



}



function Z2_CONE (X1, Y1, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon) {

    const Rayon_p = 0.;
    r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

    alpha=Math.atan((Hauteur_bat_1-Z0_1)/Rayon);

    if (r>=0 && r < Rayon_p*Math.sin(alpha)) {

        Z2_CONEE=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos(r/Rayon_p));
        Z2_CONEE0=Hauteur_bat_1;

    } else if (r>=Rayon+Rayon_p*Math.sin(alpha) && r <= Rayon_p+Rayon) {

        Z2_CONEE=Z0_1+Rayon_p*Math.sin(Math.acos((r-Rayon)/Rayon_p));
        Z2_CONEE0=Z0_1;

    } else if (r>Rayon_p*Math.sin(alpha) && r<Rayon+(Rayon_p)*Math.sin(alpha)) {

        Zi=(r-Rayon_p*Math.sin(alpha))/Math.cos(alpha);

        Zf=Zi*Math.sin(alpha)-Rayon_p*Math.cos(alpha);

        Z2_CONEE=Hauteur_bat_1-Zf;
        Z2_CONEE0=Hauteur_bat_1-Zi*Math.sin(alpha);


    } else {

        Z2_CONEE=Rayon_p
        Z2_CONEE0=0.;


    }

   

 


    return {Z2_CONEE,Z2_CONEE0};


} 


function Z2_CUBE_CY (X1, Y1, X0_1, Y0_1, Longueur_bat_1,Largeur_bat_1,Hauteur_bat_1,alpha) {
   
    const Rayon_p = 0.;
    var Z2_CUBE_CYY=Rayon_p;
    var Z2_CUBE_CYY0=Rayon_p;


    alpha=alpha*Math.PI/180;
    X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
    Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

    r = Math.sqrt(Math.pow(X_R - X0_1,2) + Math.pow(Y_R - Y0_1,2));

    XO = X0_1 - Longueur_bat_1 / 2;
    XE = X0_1 + Longueur_bat_1 / 2;
    XORR = X0_1 - Longueur_bat_1 / 2 - Rayon_p;
    XER = X0_1 + Longueur_bat_1 / 2 + Rayon_p;
    YNR = Y0_1+ Largeur_bat_1 / 2 + Rayon_p;
    YSR = Y0_1 - Largeur_bat_1 / 2 - Rayon_p;



    if (X_R >= XO && X_R<=XE && Y_R >= YSR && Y_R <=YNR) {

        Z2_CUBE_CYY=Hauteur_bat_1+(Rayon_p+Largeur_bat_1/2)*Math.sin(Math.acos((Y_R-Y0_1)/(Rayon_p+Largeur_bat_1/2)));
        Z2_CUBE_CYY0=Hauteur_bat_1+(Largeur_bat_1/2)*Math.sin(Math.acos((Y_R-Y0_1)/(Rayon_p+Largeur_bat_1/2)));

        
    } else if (X_R >= XE && X_R<=XER && Y_R >= YSR && Y_R <=YNR) {

        var Z_bat=Largeur_bat_1/2+(Rayon_p)*Math.sin(Math.acos(Math.abs(X_R-(X0_1+Longueur_bat_1/2))/Rayon_p));

        if (Math.abs(Y_R-Y0_1) >= 0 && Math.abs(Y_R-Y0_1) <=Z_bat) {

            Z2_CUBE_CYY=Z_bat*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Hauteur_bat_1;
            Z2_CUBE_CYY0=(Largeur_bat_1/2)*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Hauteur_bat_1;


        }

    




    } else if (X_R >= XORR && X_R<=XO && Y_R >= YSR && Y_R <=YNR) {

        var Z_bat=Largeur_bat_1/2+(Rayon_p)*Math.sin(Math.acos(Math.abs(X0_1-Longueur_bat_1/2-X_R)/Rayon_p));

        if (Math.abs(Y_R-Y0_1) >= 0 && Math.abs(Y_R-Y0_1) <=Z_bat) {

            Z2_CUBE_CYY=Z_bat*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Hauteur_bat_1;
            Z2_CUBE_CYY0=(Largeur_bat_1/2)*Math.cos(Math.asin(Math.abs(Y_R-Y0_1)/Z_bat))+Hauteur_bat_1;

        }




} 



return {Z2_CUBE_CYY,Z2_CUBE_CYY0};


}


/////////////////////////////////////////

function Z2_CUBE_F (X1, Y1, X0_1, Y0_1,YF_1,Longueur_bat_1,Largeur_bat_1,Hauteur_bat_1,HauteurMAX_bat_1,alpha) {

    const Rayon_p = 0.;

   var Z2_CUBE_FF=Rayon_p;
   var Z2_CUBE_FF0=0.;


   alpha=alpha*Math.PI/180;
   X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
   Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

   alpha_F_1=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2-YF_1));
   alpha_F_2=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2+YF_1));
   
   YFF_1=YF_1+Y0_1;
   
   yf_max=YFF_1+Rayon_p*Math.sin(alpha_F_1);
   yf_min=YFF_1-Rayon_p*Math.sin(alpha_F_2);

   ys_min=Y0_1+Largeur_bat_1/2+Rayon_p*Math.sin(alpha_F_1);
   ys_max=Y0_1+Largeur_bat_1/2+Rayon_p;

   yn_max=Y0_1-Largeur_bat_1/2-Rayon_p*Math.sin(alpha_F_2);
   yn_min=Y0_1-Largeur_bat_1/2-Rayon_p;

   zf_max=HauteurMAX_bat_1+Rayon_p*Math.sin(alpha_F_1);
   zf_min=HauteurMAX_bat_1+Rayon_p*Math.sin(alpha_F_2);

   if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R >=yf_min && Y_R <=yf_max) {

        Z2_CUBE_FF=HauteurMAX_bat_1+Rayon_p*Math.sin(Math.acos((Y_R-YFF_1)/Rayon_p));
        Z2_CUBE_FF0=HauteurMAX_bat_1;

    } else if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R >=ys_min && Y_R <=ys_max) {

        Z2_CUBE_FF=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos((Y_R-Largeur_bat_1/2-Y0_1)/Rayon_p));
        Z2_CUBE_FF0=Hauteur_bat_1;

    } else if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R >=yn_min && Y_R <=yn_max) {

        Z2_CUBE_FF=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos((Y0_1-Largeur_bat_1/2-Y_R)/Rayon_p));
        Z2_CUBE_FF0=Hauteur_bat_1;

    } else if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R >=yf_max && Y_R <=ys_min) {

        Zi=(Y_R-YFF_1-Rayon_p*Math.sin(alpha_F_1))/Math.cos(alpha_F_1);

        Zf=Zi*Math.sin(alpha_F_1)-Rayon_p*Math.cos(alpha_F_1);

        Z2_CUBE_FF=HauteurMAX_bat_1-Zf;
        Z2_CUBE_FF0=HauteurMAX_bat_1-Zi*Math.sin(alpha_F_1);





    } else if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R <=yf_min && Y_R >=yn_max) {

        Zi=(YFF_1-Y_R-Rayon_p*Math.sin(alpha_F_2))/Math.cos(alpha_F_2);

        Zf=Zi*Math.sin(alpha_F_2)-Rayon_p*Math.cos(alpha_F_2);

        Z2_CUBE_FF=HauteurMAX_bat_1-Zf;
        Z2_CUBE_FF0=HauteurMAX_bat_1-Zi*Math.sin(alpha_F_2);


    } else if (((X_R>=X0_1+Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2+Rayon_p) || (X_R<=X0_1-Longueur_bat_1/2 && X_R>=X0_1-Longueur_bat_1/2-Rayon_p))  && (Y_R <=YFF_1+Rayon_p && Y_R >=YFF_1) || ((Y_R >=YFF_1-Rayon_p && Y_R <=YFF_1)) ) {

        
        if (X_R>=X0_1+Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2+Rayon_p) {

            var XX=X_R-X0_1-Longueur_bat_1/2;

        } else {

            var XX=X0_1-Longueur_bat_1/2-X_R;

        }

        if (Y_R <=YFF_1+Rayon_p && Y_R >=YFF_1) {

            var alpha_FF=alpha_F_1;

        } else {

            var alpha_FF=alpha_F_2;

        }

        r=Math.sqrt(Math.pow(XX,2)+Math.pow(Y_R-YFF_1,2));
        Z_ref=Math.abs(Y_R-YFF_1)/Math.tan(alpha_FF);

        if (r<=Rayon_p) {

            Z1_bat_F=HauteurMAX_bat_1+Rayon_p*Math.sin(Math.acos(r/Rayon_p));

            if (Z1_bat_F>=HauteurMAX_bat_1+Z_ref) {

                Z2_CUBE_FF=Z1_bat_F;
                Z2_CUBE_FF0=HauteurMAX_bat_1;


            }


        }

/////////////////////////////////////

    } 
    
    if (((X_R>=X0_1+Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2+Rayon_p) || (X_R<=X0_1-Longueur_bat_1/2 && X_R>=X0_1-Longueur_bat_1/2-Rayon_p)) && ((Y_R <=Y0_1+Largeur_bat_1/2+Rayon_p && Y_R >=Y0_1+Largeur_bat_1/2) || ((Y_R >=Y0_1-Largeur_bat_1/2-Rayon_p) && (Y_R <=Y0_1-Largeur_bat_1/2)))) {

        
        if (X_R>=X0_1+Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2+Rayon_p) {

            var XX=X_R-X0_1-Longueur_bat_1/2;

        } else {

            var XX=X0_1-Longueur_bat_1/2-X_R;

        }

        if (Y_R <=Y0_1+Largeur_bat_1/2+Rayon_p && Y_R >=Y0_1+Largeur_bat_1/2)  {

            var YY=Y_R-Y0_1-Largeur_bat_1/2;
            var alpha_FF=alpha_F_1;

        } else {

            var YY=Y0_1-Largeur_bat_1/2-Y_R;
            var alpha_FF=alpha_F_2;

        }


        //if (Y_R-YFF_1>=0) {

        //    var alpha_FF=alpha_F_1;

        //} else {

        //    var alpha_FF=alpha_F_2;

        //}

        r=Math.sqrt(Math.pow(XX,2)+Math.pow(YY,2));
        Z_ref=Math.abs(YY)/Math.tan(alpha_FF);

        if (r<=Rayon_p) {

            Z1_bat_F=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos(r/Rayon_p));

            if (Z1_bat_F<=Hauteur_bat_1+Z_ref) {

                Z2_CUBE_FF=Z1_bat_F;
                Z2_CUBE_FF0=Hauteur_bat_1;


            }


        }


    }
    
    if (((X_R>=X0_1+Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2+Rayon_p)  || (X_R<=X0_1-Longueur_bat_1/2 && X_R>=X0_1-Longueur_bat_1/2-Rayon_p) ) && ((Y_R >=Y0_1-Largeur_bat_1/2-Rayon_p && Y_R <=YFF_1)  || (Y_R <=Y0_1+Largeur_bat_1/2+Rayon_p && Y_R >=YFF_1)))  {

        
        if (X_R>=X0_1+Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2+Rayon_p) {

        var XX=X_R-X0_1-Longueur_bat_1/2;

        } else {

        var XX=X0_1-Longueur_bat_1/2-X_R;


        }

        if (Y_R <=Y0_1+Largeur_bat_1/2+Rayon_p && Y_R >=YFF_1) {

        var YY=Y_R-Y0_1-Largeur_bat_1/2;
        var YY0=Y0_1+Largeur_bat_1/2-YFF_1;
        var YY1=YFF_1-Y_R;
        var alpha_FF=alpha_F_1;


        } else {

        var YY=Y0_1-Largeur_bat_1/2-Y_R;
        var YY0=-Y0_1+Largeur_bat_1/2+YFF_1;
        var YY1=-YFF_1+Y_R;
        var alpha_FF=alpha_F_2;

        }




        var lo_1=Math.sqrt(Math.pow(HauteurMAX_bat_1-Hauteur_bat_1,2)+Math.pow(YY0,2));

        var cef=Math.asin((XX)/(Rayon_p));
        var cef1=Math.cos(cef);
        var zi=(Rayon_p*cef1*Math.sin(alpha_FF)+YY1)/Math.cos(alpha_FF)+HauteurMAX_bat_1;

        if ((zi>=HauteurMAX_bat_1-lo_1) && (zi<=HauteurMAX_bat_1)) {

            Z2_CUBE_FF=HauteurMAX_bat_1+Rayon_p*cef1*Math.cos(alpha_FF)+(zi-HauteurMAX_bat_1)*Math.sin(alpha_FF);
            Z2_CUBE_FF0=HauteurMAX_bat_1-(HauteurMAX_bat_1-zi)*Math.sin(alpha_FF);


    }




    }   




////////////////////////////


   

return {Z2_CUBE_FF,Z2_CUBE_FF0};

}


function Z2_CA(x,y,X0_C,Y0_C,Z0_C,Longueur_C,Hauteur_C_1,Hauteur_C_2,Sag_C,alpha_C,deltay) {
    const Rayon_p = 0.;
   var X3;
   var X2;
   var h1;
   var Z2_CATENARY0=0.;

   if (x>10) {

    aa=0
   }

    //alpha_C=alpha_C*Math.PI/180;
    //Hauteur_C_1=Hauteur_C_1+Z0_C;
    //Hauteur_C_2=Hauteur_C_2+Z0_C;

    if (Sag_C<=0) {

        Sag_C=0.001;
    }

    if (Hauteur_C_1>=Hauteur_C_2) {

        if (Sag_C>=Hauteur_C_2)  {

            Sag_C=Hauteur_C_2


        } 


    }     else {

        if (Sag_C>=Hauteur_C_1)  {

            Sag_C=Hauteur_C_1


        } 


    }




    X1=(x-X0_C)*Math.cos(-alpha_C)-(y-Y0_C)*Math.sin(-alpha_C)+X0_C;
    Y1=(x-X0_C)*Math.sin(-alpha_C)+(y-Y0_C)*Math.cos(-alpha_C)+Y0_C;

    SD=Sag_C/(Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2));
    X0=Math.sqrt(SD)*Longueur_C/(1+Math.sqrt(SD));
    D=2*(Longueur_C-X0)

    if (Hauteur_C_1<=Hauteur_C_2) {

        angle_inclinaison_C=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*(X1-X0-X0_C)
        angle_inclinaison_C_1=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*(-X0)
        angle_inclinaison_C_2=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*(Longueur_C-X0)

        if (X1>=X0_C && X1<=Longueur_C+X0_C) {

                        
            h=Hauteur_C_1-Sag_C+4*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*Math.pow(X1-X0-X0_C,2);
            Z2_CATENARY0=h;



        } else {

            h=0.;
 
        }

    } else {

        angle_inclinaison_C=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*(X1-(Longueur_C-X0)-X0_C);
        angle_inclinaison_C_1=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*(-(Longueur_C-X0));
        angle_inclinaison_C_2=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*(Longueur_C-(Longueur_C-X0));


    

    if (X1>=X0_C && X1<=Longueur_C+X0_C) {

                        
        h=Hauteur_C_2-Sag_C+4*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*Math.pow(X1-(Longueur_C-X0)-X0_C,2);

        


    } else {

        h=0.;


    }

    }



return h;

}



//////////////////

        

function Z2_R(X1, Y1, X0_2, Y0_2, Longueur_bat_2, Largeur_bat_2, Hauteur_bat_2,alpha) {
    alpha=alpha*Math.PI/180;
    const Rayon_p=0;
    X_R=(X1-X0_2)*Math.cos(-alpha)-(Y1-Y0_2)*Math.sin(-alpha)+X0_2;
    Y_R=(X1-X0_2)*Math.sin(-alpha)+(Y1-Y0_2)*Math.cos(-alpha)+Y0_2;
    
    if (Hauteur_bat_2<=Rayon_p ) {

        Rayon_P_M_R = Math.sqrt(2 * Rayon_p * Hauteur_bat_2 - Math.pow(Hauteur_bat_2,2));

    } else {

        Rayon_P_M_R =Rayon_p;

    }

    //Rayon_P_M_R = Math.sqrt(2 * Rayon_p * Hauteur_bat_2 - Math.pow(Hauteur_bat_2,2));
    XO = X0_2 - Longueur_bat_2 / 2;
    XE = X0_2 + Longueur_bat_2 / 2;
    YN = Y0_2 + Largeur_bat_2 / 2;
    YS = Y0_2 - Largeur_bat_2 / 2;
    XORR = X0_2 - Longueur_bat_2 / 2 - Rayon_P_M_R;
    XER = X0_2 + Longueur_bat_2 / 2 + Rayon_P_M_R;
    YNR = Y0_2 + Largeur_bat_2 / 2 + Rayon_P_M_R;
    YSR = Y0_2 - Largeur_bat_2 / 2 - Rayon_P_M_R;
    RON = Math.sqrt(Math.pow(X0_2 - Longueur_bat_2 / 2 - X_R,2) + Math.pow(Y_R - Y0_2 - Largeur_bat_2 / 2,2));
    ROS = Math.sqrt(Math.pow(X0_2 - Longueur_bat_2 / 2 - X_R,2) + Math.pow(Y0_2 - Largeur_bat_2 / 2 - Y_R,2));
    REN = Math.sqrt(Math.pow(X_R - X0_2 - Longueur_bat_2 / 2,2) + Math.pow(Y_R - Y0_2 - Largeur_bat_2 / 2,2));
    RES = Math.sqrt(Math.pow(X_R - X0_2 - Longueur_bat_2 / 2,2) + Math.pow(Y0_2 - Largeur_bat_2 / 2 - Y_R,2));
    RO = X0_2 - Longueur_bat_2 / 2 - X_R;
    RE = X_R - X0_2 - Longueur_bat_2 / 2;
    RN = Y_R - Y0_2 - Largeur_bat_2 / 2;
    RS = Y0_2 - Largeur_bat_2 / 2 - Y_R;
    
    if (X_R >= XO && X_R <= XE && Y_R >= YS && Y_R <= YN) {
        Z2_RR = Rayon_p + Hauteur_bat_2;
        Z2_RR0=Hauteur_bat_2;
    }
    else if (X_R >= XORR && X_R <= XO && Y_R >= YN && Y_R <= YNR && RON < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(RON / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }
    else if (X_R >= XORR && X_R <= XO && Y_R <= YS && Y_R >= YSR && ROS < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(ROS / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }
    else if (X_R>= XE && X_R <= XER && Y_R >= YN && Y_R <= YNR && REN < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(REN / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }

    else if (X_R>= XE && X_R <= XER && Y_R >= YSR && Y_R <= YS && RES < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(RES / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }

    else if (X_R >= XORR && X_R <= XO && Y_R >= YS && Y_R <= YN && RO < Rayon_P_M_R){ 
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(RO / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }

    else if (X_R>= XE && X_R <= XER && Y_R >= YS && Y_R <= YN && RE < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(RE / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }

    else if (X_R>= XO && X_R<= XE && Y_R >= YN && Y_R <= YNR && RN < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(RN / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    } 

    else if (X_R>= XO && X_R <= XE && Y_R >= YSR && Y_R <= YS && RS < Rayon_P_M_R) {
        Z2_RR = Hauteur_bat_2 + Rayon_p * Math.sin(Math.acos(RS / Rayon_p));
        Z2_RR0=Hauteur_bat_2;
    }

    else {
        Z2_RR = Rayon_p;
        Z2_RR0=0;
    }



    
    return {Z2_RR,Z2_RR0};

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////// OFFSETS PTS///////////////////////////////////////


function Z2_PTS(X1, Y1, X0_pts, Y0_pts,Z0_pts, Hauteur_pts,Hauteur_reference) {

    const Rayon_p = 0.;

r_pts = Math.sqrt(Math.pow(X1 - X0_pts,2) + Math.pow(Y1 - Y0_pts,2));

if (Hauteur_pts<=Hauteur_reference) {
  

    if (r_pts<=Rayon_p) {

        Rayon_P_M_pts = Math.sqrt(Math.pow(Rayon_p,2) - Math.pow(Hauteur_reference-Hauteur_pts,2));

        if (r_pts<=Rayon_P_M_pts) {

        Z2_PTS_1 = Hauteur_pts + Rayon_p * Math.sin(Math.acos(r_pts / Rayon_p));

        } else {

            Z2_PTS_1 = Rayon_p;
        }

    } else {

        Z2_PTS_1 = Rayon_p;

    }


} else if (Z0_pts>=Hauteur_reference) {

     if (r_pts<=Rayon_p) {

        Rayon_P_M_pts = Math.sqrt(Math.pow(Rayon_p,2) - Math.pow(Hauteur_reference-Z0_pts,2));

        if (r_pts<=Rayon_P_M_pts) {

            Z2_PTS_1=Hauteur_reference+1.;

 



        } else {

            Z2_PTS_1 = Rayon_p;
        }

    } else {

        Z2_PTS_1 = Rayon_p;

    }


} else {

    if (r_pts<=Rayon_p) {

        Z2_PTS_1=Hauteur_reference+1.;


    } else {

        Z2_PTS_1 = Rayon_p;

    }
}

Z2_PTS2_1 = Hauteur_pts;


return Z2_PTS_1

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////OFFSECT PDA /////////////////////////////////////////////////////////////


function Z2_PDA(X, Y, X0_pda, Y0_pda,Z0_pda, Hauteur_PDA_2,Hauteur_pour_PDA,k,Hauteur_reference,o) {

    const Rayon_p = 0.;
    
var DeltaL=group_data_cube_float[k].DeltaT;

Z2_PDAA=Rayon_p;



var Rayon_PDA=0*Rayon_p+DeltaL;

if (group_data_cube_float[k].prevICPE==='ICPE') {

   var coefficient_reducteur=0.6;

} else {
    
    var coefficient_reducteur=1.0;

}


var Hauteur_limite_1 = 2.;

var Hauteur_limite_2 = 5.;

Rayon_P_M_1 = coefficient_reducteur*Math.sqrt(2 * Rayon_p * Hauteur_limite_2 - Math.pow(Hauteur_limite_2,2) + Rayon_PDA * (2 * Rayon_p + Rayon_PDA)) * Hauteur_limite_1 / Hauteur_limite_2;

Rayon_P_M_2 = coefficient_reducteur*Math.sqrt(2 * Rayon_p * Hauteur_limite_2 - Math.pow(Hauteur_limite_2,2) + Rayon_PDA * (2 * Rayon_p + Rayon_PDA));

Rayon_P_M_3 = coefficient_reducteur*Math.sqrt(Math.pow(Rayon_p,2) + Rayon_PDA * (2 * Rayon_p + Rayon_PDA));


r = Math.sqrt(Math.pow(X - X0_pda,2) + Math.pow(Y - Y0_pda,2));


var Delta = Hauteur_PDA_2 - Hauteur_pour_PDA;

if (Delta >= Hauteur_limite_1 && Delta <= Hauteur_limite_2) {

    var r_p = (Rayon_P_M_2 - Rayon_P_M_1) * (Delta - Hauteur_limite_1) / (Hauteur_limite_2 - Hauteur_limite_1) + Rayon_P_M_1;
    var r_PDA_C = Math.sqrt(Math.pow(r_p,2) + Math.pow(Hauteur_reference - Hauteur_PDA_2,2));

    ///////////
    if (r<= r_PDA_C) {

        if (Hauteur_PDA_2<=Hauteur_reference) {

            Z2_PDAA = Hauteur_PDA_2 + (r_PDA_C) * Math.sin(Math.acos(r / (r_PDA_C)));

        } else { 

            Z2_PDAA = Hauteur_PDA_2 - (r_PDA_C) * Math.sin(Math.acos(r / (r_PDA_C)));

            if ((Z2_PDAA<=Hauteur_reference)) {

                Z2_PDAA=Hauteur_reference+1;

            } else {

                Z2_PDAA=Rayon_p;
            }

        }

    } else {

        Z2_PDAA=Rayon_p;
    }



    ///////////
 

} else if (Delta >= Hauteur_limite_2) {

    if (r <= Rayon_P_M_3) {

        r_p=coefficient_reducteur*Math.sqrt(2 * Rayon_p * (Hauteur_PDA_2-Hauteur_pour_PDA) - Math.pow(Hauteur_PDA_2-Hauteur_pour_PDA,2) + Rayon_PDA * (2 * Rayon_p + Rayon_PDA));

        var r_PDA_C = Math.sqrt(Math.pow(r_p,2) + Math.pow(Hauteur_reference - Hauteur_PDA_2,2));

        if (r<= r_PDA_C) {

            if (Hauteur_PDA_2<=Hauteur_reference) {

            Z2_PDAA = Hauteur_PDA_2 + (r_PDA_C) * Math.sin(Math.acos(r / (r_PDA_C)));

            } else { 

            Z2_PDAA = Hauteur_PDA_2 - (r_PDA_C) * Math.sin(Math.acos(r / (r_PDA_C)));

            if ((Z2_PDAA<=Hauteur_reference)) {

                Z2_PDAA=Hauteur_reference+1;

            } else {

                Z2_PDAA=Rayon_p;
            }




            }

        } else {

            Z2_PDAA=Rayon_p;
        }



        //Z2_PDA = Hauteur_PDA_2 + (Rayon_PDA + Rayon_p) * Math.sin(Math.acos(r / (Rayon_PDA + Rayon_p)));


        


    } else {

        Z2_PDAA = Rayon_p

    }



} else {

    Z2_PDAA = Rayon_p;

}


Z2_PTSS=Z2_PTS(X, Y, X0_pda, Y0_pda,Z0_pda, Hauteur_PDA_2,Hauteur_reference);

if (Z2_PDAA<=Z2_PTSS && Hauteur_PDA_2-Hauteur_pour_PDA>=2.) {

    Z2_PDAA=Z2_PTSS;
}



if (group_data_cube_float[o].group_name=='group_sphere') {

    Rayon_sphere=group_data_cube_float[o].Rayon;
    x0_1=group_data_cube_float[o].x0_1;
    y0_1=group_data_cube_float[o].y0_1;
    z0_1=group_data_cube_float[o].z0_1;
    rr=Math.sqrt(Math.pow(X0_pda-x0_1,2)+Math.pow(Y0_pda-y0_1,2));

    if (rr<=Rayon_sphere) {

        ZZ0 = z0_1 + (Rayon_sphere) * Math.sin(Math.acos(rr / (Rayon_sphere)));

        if (Hauteur_PDA_2-ZZ0<2) {

            Z2_PDAA = Rayon_p;


        }

    }

 

} else if (group_data_cube_float[o].group_name=='group_cylinder_sp') {


    Rayon=group_data_cube_float[o].Rayon;
    x0_1=group_data_cube_float[o].x0_1;
    y0_1=group_data_cube_float[o].y0_1;
    z0_1=group_data_cube_float[o].z0_1;
    Hauteur_bat_1=group_data_cube_float[o].Hauteur_bat_1;
    rr=Math.sqrt(Math.pow(X0_pda-x0_1,2)+Math.pow(Y0_pda-y0_1,2));

    if (rr<=Rayon) {

        ZZ0 = Hauteur_bat_1 + (Rayon) * Math.sin(Math.acos(rr / (Rayon)));

        if (Hauteur_PDA_2-ZZ0<2) {

            Z2_PDAA = Rayon_p;


        }

    }



} else if (group_data_cube_float[o].group_name==='group_cylinder') {

    Rayon_sup=group_data_cube_float[o].Rayon_sup;
    Rayon_inf=group_data_cube_float[o].Rayon_inf;
    Hauteur_bat_1=group_data_cube_float[o].Hauteur_bat_1;
    x0_1=group_data_cube_float[o].x0_1;
    y0_1=group_data_cube_float[o].y0_1;
    z0_1=group_data_cube_float[o].z0_1;

    rr=Math.sqrt(Math.pow(X0_pda-x0_1,2)+Math.pow(Y0_pda-y0_1,2));

    if (Rayon_sup===Rayon_inf) {

        alpha=Math.PI/2;


    } else {

        alpha=Math.atan((Hauteur_bat_1-z0_1)/Math.abs(Rayon_sup-Rayon_inf));

    }

    if (rr>Rayon_sup && rr<Rayon_inf) {

        ZZ0 = z0_1 + Math.tan(alpha)*(Rayon_inf-rr);

            if (Hauteur_PDA_2-ZZ0<2.) {

             Z2_PDAA = Rayon_p;


            }




  




} else if (rr<=Rayon_sup) {

    if (Hauteur_PDA_2-Hauteur_bat_1 <2.) {

        Z2_PDAA = Rayon_p;


    }


}

} else if (group_data_cube_float[o].group_name==='group_cylinderh') {

    Rayon=group_data_cube_float[o].Rayon;
    Longueur_bat_1=group_data_cube_float[o].Longueur_bat_1;
    x0_1=group_data_cube_float[o].x0_1;
    y0_1=group_data_cube_float[o].y0_1;
    z0_1=group_data_cube_float[o].z0_1;
    alpha=-group_data_cube_float[o].alpha*Math.PI/180;
    XO = x0_1 - Longueur_bat_1 / 2;
    XE = x0_1 + Longueur_bat_1 / 2;
    YN = y0_1+ Rayon;
    YS = y0_1 - Rayon;
    X00_pda=(X0_pda-x0_1)*Math.cos(-alpha)-(Y0_pda-y0_1)*Math.sin(-alpha)+x0_1;
    Y00_pda=(X0_pda-x0_1)*Math.sin(-alpha)+(Y0_pda-y0_1)*Math.cos(-alpha)+y0_1;
    

    if (X00_pda >= XO && X00_pda <=XE && Y00_pda >= YS && Y00_pda <=YN) {

        ZZ0=z0_1+(Rayon)*Math.sin(Math.acos((Y00_pda-y0_1)/(Rayon)));

        if (Hauteur_PDA_2-ZZ0<2.) {

            Z2_PDAA = Rayon_p;

        }

    }


} else if (group_data_cube_float[o].group_name==='group_cube_cy') {

Largeur_bat_1=group_data_cube_float[o].Largeur_bat_1;
Longueur_bat_1=group_data_cube_float[o].Longueur_bat_1;
Hauteur_bat_1=group_data_cube_float[o].Hauteur_bat_1;
x0_1=group_data_cube_float[o].x0_1;
y0_1=group_data_cube_float[o].y0_1;
z0_1=group_data_cube_float[o].z0_1;
alpha=-group_data_cube_float[o].alpha*Math.PI/180;
XO = x0_1 - Longueur_bat_1 / 2;
XE = x0_1 + Longueur_bat_1 / 2;
YN = y0_1+ Largeur_bat_1/2;
YS = y0_1 - Largeur_bat_1/2;
X00_pda=(X0_pda-x0_1)*Math.cos(-alpha)-(Y0_pda-y0_1)*Math.sin(-alpha)+x0_1;
Y00_pda=(X0_pda-x0_1)*Math.sin(-alpha)+(Y0_pda-y0_1)*Math.cos(-alpha)+y0_1;


if (X00_pda >= XO && X00_pda <=XE && Y00_pda >= YS && Y00_pda <=YN) {

    ZZ0=Hauteur_bat_1+(Largeur_bat_1/2)*Math.sin(Math.acos((Y00_pda-y0_1)/(Largeur_bat_1/2)));

    if (Hauteur_PDA_2-ZZ0<2.) {

        Z2_PDAA = Rayon_p;

    }

}


} else if (group_data_cube_float[o].group_name==='group_cube_f') {

Largeur_bat_1=group_data_cube_float[o].Largeur_bat_1;
Longueur_bat_1=group_data_cube_float[o].Longueur_bat_1;
Hauteur_bat_1=group_data_cube_float[o].Hauteur_bat_1;
HauteurMAX_bat_1 = group_data_cube_float[o].HauteurMax_bat_1;

x0_1=group_data_cube_float[o].x0_1;
y0_1=group_data_cube_float[o].y0_1;
z0_1=group_data_cube_float[o].z0_1;
YF_1 = group_data_cube_float[o].yf_1;
alpha=-group_data_cube_float[o].alpha*Math.PI/180;

XO = x0_1 - Longueur_bat_1 / 2;
XE = x0_1 + Longueur_bat_1 / 2;
YN = y0_1+ Largeur_bat_1/2;
YS = y0_1 - Largeur_bat_1/2;
YFF_1=YF_1+y0_1;

alpha_F_1=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2-YF_1));
alpha_F_2=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2+YF_1));

X00_pda=(X0_pda-x0_1)*Math.cos(-alpha)-(Y0_pda-y0_1)*Math.sin(-alpha)+x0_1;
Y00_pda=(X0_pda-x0_1)*Math.sin(-alpha)+(Y0_pda-y0_1)*Math.cos(-alpha)+y0_1;

if (X00_pda >= XO && X00_pda <=XE && Y00_pda >= YS && Y00_pda <=YFF_1) {

    ZZ0=Hauteur_bat_1+(Y00_pda-y0_1+Largeur_bat_1/2)*Math.tan(alpha_F_2);

    if (Hauteur_PDA_2-ZZ0<2.) {

        Z2_PDAA = Rayon_p;

    }

} else if (X00_pda >= XO && X00_pda <=XE && Y00_pda >= YFF_1 && Y00_pda <=YN) {

    ZZ0=Hauteur_bat_1+(y0_1+Largeur_bat_1/2-Y00_pda)*Math.tan(alpha_F_1);

    if (Hauteur_PDA_2-ZZ0<2.) {

        Z2_PDAA = Rayon_p;

    }

}


} else if (group_data_cube_float[o].group_name==='group_cone') {


    x0_1=group_data_cube_float[o].x0_1;
    y0_1=group_data_cube_float[o].y0_1;
    z0_1=group_data_cube_float[o].z0_1; 
    Rayon = group_data_cube_float[o].Rayon;
    Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;

    rr=Math.sqrt(Math.pow(X0_pda-x0_1,2)+Math.pow(Y0_pda-y0_1,2));
    alpha=Math.atan((Hauteur_bat_1-z0_1)/Rayon);


    if (rr<=Rayon) {

        ZZ0 = z0_1 + Math.tan(alpha)*(Rayon-rr);

            if (Hauteur_PDA_2-ZZ0<2.) {

             Z2_PDAA = Rayon_p;

            }

        }












}




return Z2_PDAA;




 


}

Rayon_p = 0.;




function programme_principal(group_data_cube_float,Nombre_points,x0,y0,z0) {

    test_snp=1;
    const materialNormal = new THREE.LineBasicMaterial({ color: 0xffffff }); // Couleur normale des segments
    
    var distancefs=10000;
    


//const Rayon_p = 0*parseFloat(document.getElementById('rayon-sphere-fictive').value);
//Rayon_pp=parseFloat(document.getElementById('rayon-sphere-fictive').value);

var Z=[];

snp=[];
var element_saved=false;
var o1=null;
var zk=null;
var ref_1;
var ref_2;






//document.getElementById('run').disabled = true;
//document.getElementById('run').classList.add('disabled');



for (let o = 0; o <= group_data_cube_float.length-1; o++) {

    

if (group_data_cube_float[o].group_name==='group_cube') {

var Longueur_bat_1 = group_data_cube_float[o].Longueur_bat_1;
var group_name=group_data_cube_float[o].group_name;
var Largeur_bat_1 = group_data_cube_float[o].Largeur_bat_1;
//var Hauteur_bat_1 = group_data_cube_float[i].Hauteur_bat_1;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
var alpha = -group_data_cube_float[o].alpha*Math.PI/180;
var spec=group_data_cube_float[o].prevSpec;



if (Hauteur_bat_1>=Rayon_p) {

    var Rayon_P_M=Rayon_p;


} else {

    var Rayon_P_M=Math.sqrt(2 * Rayon_p * Hauteur_bat_1 - Math.pow(Hauteur_bat_1,2));
}

if (spec==='Ceinturée') {

    Rayon_P_M=0;
} else if (spec==='Protégée' || spec==='Ignorée') {

    continue
}

var X_min = X0_1 - Longueur_bat_1 / 2 - Rayon_P_M; 
var X_max = X0_1 + Longueur_bat_1 / 2 + Rayon_P_M;
var Y_min = Y0_1 - Largeur_bat_1 / 2 - Rayon_P_M;
var Y_max = Y0_1 + Largeur_bat_1 / 2 + Rayon_P_M;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points

}   else if (group_data_cube_float[o].group_name==='group_sphere') {

var Rayon = group_data_cube_float[o].Rayon;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var spec=group_data_cube_float[o].prevSpec;


if (Z0_1>=Rayon_p) {

    var Rayon_P_M=(Rayon_p+Rayon);


} else {

    var Rayon_P_M = Math.sqrt(Math.pow(Rayon,2)+2*Rayon_p*Rayon+2*Rayon_p*Z0_1 - Math.pow(Z0_1,2));

    //var Rayon_P_M=Math.sqrt(2 * (Rayon_p+Rayon) * Z0_1 - Math.pow(Z0_1,2));
}

if (spec==='Protégée' || spec==='Ignorée') {

continue

}


var X_min = X0_1 - Rayon - Rayon_P_M; 
var X_max = X0_1 + Rayon + Rayon_P_M;
var Y_min = Y0_1 - Rayon - Rayon_P_M;
var Y_max = Y0_1 + Rayon + Rayon_P_M;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


} else if (group_data_cube_float[o].group_name==='group_cylinder_sp') {


var Rayon = group_data_cube_float[o].Rayon;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var spec=group_data_cube_float[o].prevSpec;
Hauteur_pour_PDA_2=Hauteur_bat_1+Rayon;


if (Hauteur_bat_1>=Rayon_p) {

    var Rayon_P_M=(Rayon_p+Rayon);


} else {

    var Rayon_P_M = Math.sqrt(Math.pow(Rayon,2)+2*Rayon_p*Rayon+2*Rayon_p*Hauteur_bat_1 - Math.pow(Hauteur_bat_1,2));

}

if (spec==='Protégée' || spec==='Ignorée') {

continue

}


var X_min = X0_1 - Rayon - Rayon_P_M; 
var X_max = X0_1 + Rayon + Rayon_P_M;
var Y_min = Y0_1 - Rayon - Rayon_P_M;
var Y_max = Y0_1 + Rayon + Rayon_P_M;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


} else if (group_data_cube_float[o].group_name==='group_cylinder') {


var Rayon_inf = group_data_cube_float[o].Rayon_inf;
var Rayon_sup = group_data_cube_float[o].Rayon_sup;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var spec=group_data_cube_float[o].prevSpec;
Hauteur_pour_PDA_2=Hauteur_bat_1;


if (Rayon_sup<=Rayon_inf) {

    Rayon_max=Rayon_inf;

} else {

    Rayon_max=Rayon_sup;

}

if (spec==='Protégée' || spec==='Ignorée') {

continue

}


var X_min = X0_1 - Rayon_max - Rayon_p; 
var X_max = X0_1 + Rayon_max + Rayon_p;
var Y_min = Y0_1 - Rayon_max - Rayon_p;
var Y_max = Y0_1 + Rayon_max + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points

} else if (group_data_cube_float[o].group_name==='group_cylinderh') {

var Longueur_bat_1 = group_data_cube_float[o].Longueur_bat_1;
var Rayon = group_data_cube_float[o].Rayon;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var alpha = -group_data_cube_float[o].alpha*Math.PI/180;
var spec=group_data_cube_float[o].prevSpec;
Hauteur_pour_PDA_2=Rayon+Z0_1;


if (spec==='Protégée' || spec==='Ignorée') {

continue

}

var X_min = X0_1 - Longueur_bat_1 - Rayon_p; 
var X_max = X0_1 + Longueur_bat_1 + Rayon_p;
var Y_min = Y0_1 - Rayon - Rayon_p;
var Y_max = Y0_1 + Rayon + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points

} else if (group_data_cube_float[o].group_name==='group_cone') {


var Rayon = group_data_cube_float[o].Rayon;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var spec=group_data_cube_float[o].prevSpec;
Hauteur_pour_PDA_2=Hauteur_bat_1;

if (spec==='Protégée' || spec==='Ignorée') {

continue

}

var X_min = X0_1 - Rayon - Rayon_p; 
var X_max = X0_1 + Rayon + Rayon_p;
var Y_min = Y0_1 - Rayon - Rayon_p;
var Y_max = Y0_1 + Rayon + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


} else if (group_data_cube_float[o].group_name==='group_cube_cy') {


var Longueur_bat_1 = group_data_cube_float[o].Longueur_bat_1;
var Largeur_bat_1 = group_data_cube_float[o].Largeur_bat_1;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var alpha = -group_data_cube_float[o].alpha*Math.PI/180;
var spec=group_data_cube_float[o].prevSpec;
Hauteur_pour_PDA_2=Hauteur_bat_1;


if (spec==='Protégée' || spec==='Ignorée') {

continue

}

var X_min = X0_1 - Longueur_bat_1/2 - Rayon_p; 
var X_max = X0_1 + Longueur_bat_1/2 + Rayon_p;
var Y_min = Y0_1 - Largeur_bat_1/2 - Rayon_p;
var Y_max = Y0_1 + Largeur_bat_1/2 + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


} else if (group_data_cube_float[o].group_name==='group_cube_f') {


var Longueur_bat_1 = group_data_cube_float[o].Longueur_bat_1;
var Largeur_bat_1 = group_data_cube_float[o].Largeur_bat_1;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
var HauteurMAX_bat_1 = group_data_cube_float[o].HauteurMax_bat_1;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var YF_1 = group_data_cube_float[o].yf_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var alpha = -group_data_cube_float[o].alpha*Math.PI/180;
var spec=group_data_cube_float[o].prevSpec;
Hauteur_pour_PDA_2=HauteurMAX_bat_1;

if (spec==='Protégée' || spec==='Ignorée') {

continue

}

var X_min = X0_1 - Longueur_bat_1/2 - Rayon_p; 
var X_max = X0_1 + Longueur_bat_1/2 + Rayon_p;
var Y_min = Y0_1 - Largeur_bat_1/2 - Rayon_p;
var Y_max = Y0_1 + Largeur_bat_1/2 + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


} else if (group_data_cube_float[o].group_name==='group_ca') {


var Longueur_C = group_data_cube_float[o].Longueur_C;
var X0_C = group_data_cube_float[o].X0_C;
var Y0_C = group_data_cube_float[o].Y0_C;
var Z0_C = group_data_cube_float[o].Z0_C;
var Sag_C=group_data_cube_float[o].Sag_C;

var Hauteur_C_1 = group_data_cube_float[o].Hauteur_C_1;
var Hauteur_C_2 = group_data_cube_float[o].Hauteur_C_2;
var group_name=group_data_cube_float[o].group_name;
var alpha_C = -group_data_cube_float[o].alpha_C;
var spec=group_data_cube_float[o].prevSpec;

if (spec==='Protégée' || spec==='Ignorée') {

continue

}

var X_min = X0_C - Rayon_p; 
var X_max = X0_C + Longueur_C + Rayon_p;
var Y_min = Y0_C - Rayon_p;
var Y_max = Y0_C + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


} else if (group_data_cube_float[o].group_name==='group_pts') {

var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].x0_1;
var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;

var group_name=group_data_cube_float[o].group_name;
var alpha_C = -group_data_cube_float[o].alpha_C;
var spec=group_data_cube_float[o].prevSpec;


var X_min = X0_1 - Rayon_p; 
var X_max = X0_1 + Rayon_p;
var Y_min = Y0_1- Rayon_p;
var Y_max = Y0_1 + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


}//// ADD STRUCTURES 


/////////////////////////////////////////boucle////////////////////////////

for (var i=0;i<Nombre_points+1;i++) {
    var X=X_min+i*Deltax

for (var j=0;j<Nombre_points+1;j++){
    var Y=Y_min+j*Deltay

    var Z4 = Rayon_p

    if (group_data_cube_float[o].group_name==='group_cube') {

    var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
    var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1
    ref_1=Hauteur_bat_1;
       
    output=Z2_R(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].Longueur_bat_1, group_data_cube_float[o].Largeur_bat_1, group_data_cube_float[o].Hauteur_bat_1, -group_data_cube_float[o].alpha);
    Z[o]=output.Z2_RR;
    Hauteur_pour_PDA=output.Z2_RR0;
    
    } else if (group_data_cube_float[o].group_name==='group_sphere') {
        var X1=X;
        var Y1=Y;
  
        output=Z2_SP(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Rayon); 
        Z[o]=output.Z2_SPP;
        Hauteur_pour_PDA=output.Z2_SPP0;
        

    } else if (group_data_cube_float[o].group_name==='group_cylinder_sp') {
        var X1=X;
        var Y1=Y;

        output=Z2_CY_SP(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon); 
        Z[o]=output.Z2_CY_SPP;
        Hauteur_pour_PDA=output.Z2_CY_SPP0;
        

    } else if (group_data_cube_float[o].group_name==='group_cylinder') {
        var X1=X;
        var Y1=Y;

        output=Z2_CY(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon_sup,group_data_cube_float[o].Rayon_inf); 
        Z[o]=output.Z2_CYY;
        Hauteur_pour_PDA=output.Z2_CYY0;
        

    } else if (group_data_cube_float[o].group_name==='group_cylinderh') {
        
        var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1

        output=Z2_CYH (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1,group_data_cube_float[o].z0_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Rayon,-group_data_cube_float[o].alpha);
        Z[o]=output.Z2_CYHH;
        Hauteur_pour_PDA=output.Z2_CYHH0;    
        
 

    } else if (group_data_cube_float[o].group_name==='group_cone') {
        var X1=X;
        var Y1=Y;

        output=Z2_CONE(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon); 
        Z[o]=output.Z2_CONEE;
        Hauteur_pour_PDA=output.Z2_CONEE0;
        

    } else if (group_data_cube_float[o].group_name==='group_cube_cy') {
        
        var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1

        output=Z2_CUBE_CY (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Largeur_bat_1,group_data_cube_float[o].Hauteur_bat_1,-group_data_cube_float[o].alpha);
        Z[o]=output.Z2_CUBE_CYY;
        Hauteur_pour_PDA=output.Z2_CUBE_CYY0;     
        
 

    } else if (group_data_cube_float[o].group_name==='group_cube_f') {
        
        var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1

        output=Z2_CUBE_F (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1,group_data_cube_float[o].yf_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Largeur_bat_1,group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].HauteurMax_bat_1,-group_data_cube_float[o].alpha);
        Z[o]=output.Z2_CUBE_FF;
        Hauteur_pour_PDA=output.Z2_CUBE_FF0;  

       

    } else if (group_data_cube_float[o].group_name==='group_ca') {
        
        var X1=(X-X0_C)*Math.cos(alpha_C)-(Y-Y0_C)*Math.sin(alpha_C)+X0_C
        var Y1=(X-X0_C)*Math.sin(alpha_C)+(Y-Y0_C)*Math.cos(alpha_C)+Y0_C

        Z[o]=Z2_CA (X1, Y1, group_data_cube_float[o].X0_C, group_data_cube_float[o].Y0_C,group_data_cube_float[o].Z0_C,group_data_cube_float[o].Longueur_C, group_data_cube_float[o].Hauteur_C_1,group_data_cube_float[o].Hauteur_C_2,group_data_cube_float[o].Sag_C,-group_data_cube_float[o].alpha_C,Deltay);
        //Z[o]=output.Z2_CATENARY0;
        //Hauteur_pour_PDA=output.Z2_CATENARY0;
        //X3=output.X3;
        //h1=output.h1;
       // positions.push(X1,Z[o],Y1);
              

    } 


    zo = Z[o]

    //pointtest = {X1,zo,Y1};

    pointtest = new THREE.Vector3(X1, zo, Y1); // Ensure X1, zo, and Y1 are properly defined


    //const Rayon_pp = parseFloat(document.getElementById('rayon-sphere-fictive').value);
  

    const distancefoudrestructure = Math.sqrt(Math.pow(x0-pointtest.x,2)+Math.pow(y0-pointtest.y,2)+Math.pow(z0-pointtest.z,2));

    if (distancefoudrestructure<=distancefs && y0>pointtest.y) {

        distancefs=distancefoudrestructure;
        
        pointtest2 = new THREE.Vector3(X1, zo, Y1); // Ensure X1, zo, and Y1 are properly defined


        selectedgroup=o;

    }









 



    }

    }


    if (group_data_cube_float[o].group_name==='group_pts') {

        var X1 = group_data_cube_float[o].x0_1;
        var Y1 = group_data_cube_float[o].y0_1;
        var Hauteur_bat_1 = group_data_cube_float[o].Hauteur_bat_1;
        zo=Hauteur_bat_1;

        pointtest = new THREE.Vector3(X1, zo, Y1); // Ensure X1, zo, and Y1 are properly defined


        //const Rayon_pp = parseFloat(document.getElementById('rayon-sphere-fictive').value);



        const distancefoudrestructure = Math.sqrt(Math.pow(x0-pointtest.x,2)+Math.pow(y0-pointtest.y,2)+Math.pow(z0-pointtest.z,2));

        if (distancefoudrestructure<=distancefs && y0>pointtest.y) {

            distancefs=distancefoudrestructure;

            pointtest2 = new THREE.Vector3(X1, zo, Y1); // Ensure X1, zo, and Y1 are properly defined

            //pointtest2_array.push(pointtest2);
  
            selectedgroup=o;
            

        }

  
        
 

    }     

    

    
    
      

    

}
    

//Points_espace(positions);

    
    x_pointtest2 = pointtest2.x;
    y_pointtest2 = pointtest2.y;
    z_pointtest2 = pointtest2.z;

    return { x_pointtest2,y_pointtest2,z_pointtest2,selectedgroup };

 
 

}

// Exporter la fonction pour pouvoir l'utiliser dans d'autres fichiers
module.exports = {
    programme_principal
};