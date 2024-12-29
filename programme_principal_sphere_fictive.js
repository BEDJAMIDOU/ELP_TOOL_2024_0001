
function Z2_SP(X, Y, X0_1, Y0_1, Z0_1, Rayon,Rayon_p) {


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

function Z2_CY_SP(X, Y, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon,Rayon_p) {


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


function Z2_CY(X, Y, X0_1, Y0_1, Z0_1, Hauteur_bat_1,Rayon_sup,Rayon_inf,Rayon_p) {

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

function Z2_CYH (X1, Y1, X0_1, Y0_1,Z0_1, Longueur_bat_1,Rayon,alpha,Rayon_p) {
   

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



function Z2_CONE (X1, Y1, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon,Rayon_p) {


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


function Z2_CUBE_CY (X1, Y1, X0_1, Y0_1, Longueur_bat_1,Largeur_bat_1,Hauteur_bat_1,alpha,Rayon_p) {
   

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

function Z2_CUBE_F (X1, Y1, X0_1, Y0_1,YF_1,Longueur_bat_1,Largeur_bat_1,Hauteur_bat_1,HauteurMAX_bat_1,alpha,Rayon_p) {



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


function Z2_CA(x,y,X0_C,Y0_C,Z0_C,Longueur_C,Hauteur_C_1,Hauteur_C_2,Sag_C,alpha_C,deltay,Rayon_p) {

   var X3;
   var X2;
   var h1;
   var Z2_CATENARY0=0.;

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





Rayon_p_C=Rayon_p/Math.cos(Math.abs(angle_inclinaison_C));

r_1=Math.sqrt(Math.pow(X1-X0_C,2)+Math.pow(Y1-Y0_C,2));
r_2=Math.sqrt(Math.pow(X1-X0_C-Longueur_C,2)+Math.pow(Y1-Y0_C,2));

if ((X1>=X0_C && X1<=Longueur_C+X0_C) && (Y1>=Y0_C-Rayon_p) && (Y1<=Y0_C+Rayon_p)) {

    C_A=(Rayon_p*Math.sin(Math.acos((Y1-Y0_C)/Rayon_p)));
    C_B=8*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2));

    if (Hauteur_C_1<=Hauteur_C_2) {

        X2=(C_A*C_B*(X0+X0_C)-X1)/(C_A*C_B-1);
        X3=X2;
        h=Hauteur_C_1-Sag_C+4*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*Math.pow(X1-X0-X0_C,2);
        h1=Hauteur_C_1-Sag_C+4*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*Math.pow(X2-X0-X0_C,2);
        Z2_CATENARY_1=(Rayon_p * Math.sin(Math.acos((Y1-Y0_C) / Rayon_p)) +h-h)*Math.cos(-C_B)+(0)*Math.sin(-C_B)+h;
        Z2_CATENARY0=h1;


    } else {

        X2=(C_A*C_B*(Longueur_C-X0+X0_C)-X1)/(C_A*C_B-1);
        X3=X2;
        h=Hauteur_C_2-Sag_C+4*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*Math.pow(X1-(Longueur_C-X0)-X0_C,2);
        h1=Hauteur_C_2-Sag_C+4*((Sag_C+Math.abs(Hauteur_C_1-Hauteur_C_2))/Math.pow(D,2))*Math.pow(X2-(Longueur_C-X0)-X0_C,2);
        Z2_CATENARY_1=(Rayon_p * Math.sin(Math.acos((Y1-Y0_C) / Rayon_p)) +h-h)*Math.cos(-C_B)+(0)*Math.sin(-C_B)+h;
        Z2_CATENARY0=h1;
        
    }
    

    


} else {

    
    Z2_CATENARY_1=Rayon_p;
    
}

if (X2<=X0_C) {

//Z2_CATENARY_1=Rayon_p;

X3=X0_C;
h1=Hauteur_C_1;
Z2_CATENARY0=h1;




} else if (X2>=Longueur_C+X0_C) {

X3=Longueur_C+X0_C;
h1=Hauteur_C_2;
Z2_CATENARY0=h1;

} 



r_1=Math.sqrt(Math.pow(X1-X0_C,2)+Math.pow(Y1-Y0_C,2));
r_2=Math.sqrt(Math.pow(X1-X0_C-Longueur_C,2)+Math.pow(Y1-Y0_C,2));

if (r_1<=Rayon_p) {

    Z2_CATENARY_2=Hauteur_C_1+Rayon_p*Math.sin(Math.acos(r_1/Rayon_p));

    if (Z2_CATENARY_2<=Rayon_p) {

        Z2_CATENARY_2=Rayon_p;


    }

} else {

    Z2_CATENARY_2=Rayon_p;

}



if (r_2<=Rayon_p) {

    Z2_CATENARY_3=Hauteur_C_2+Rayon_p*Math.sin(Math.acos(r_2/Rayon_p))

    if(Z2_CATENARY_3<=Rayon_p) {

        Z2_CATENARY_3=Rayon_p;


    }


} else {

    Z2_CATENARY_3=Rayon_p;


}

if ((Z2_CATENARY_1>=Z2_CATENARY_2) && (Z2_CATENARY_1>=Z2_CATENARY_3)) {

    Z2_CATENARY=Z2_CATENARY_1;
    

    //X3=X2;
   

} else if ((Z2_CATENARY_2>=Z2_CATENARY_1) && (Z2_CATENARY_2>=Z2_CATENARY_3)) {

    Z2_CATENARY=Z2_CATENARY_2;
    X3=X0_C;
    h1=Hauteur_C_1;
    Z2_CATENARY0=Hauteur_C_1;
    

} else {

    Z2_CATENARY=Z2_CATENARY_3;
    X3=Longueur_C+X0_C;
    h1=Hauteur_C_2;
    Z2_CATENARY0=Hauteur_C_2;
    


}




return {Z2_CATENARY,X3,h1,Z2_CATENARY0};

}



//////////////////

        

function Z2_R(X1, Y1, X0_2, Y0_2, Longueur_bat_2, Largeur_bat_2, Hauteur_bat_2,alpha,Rayon_p) {
    alpha=alpha*Math.PI/180;
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


function Z2_PTS(X1, Y1, X0_pts, Y0_pts,Z0_pts, Hauteur_pts,Hauteur_reference,Rayon_p) {

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


return Z2_PTS_1

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////OFFSECT PDA /////////////////////////////////////////////////////////////


function Z2_PDA(X, Y, X0_pda, Y0_pda,Z0_pda, Hauteur_PDA_2,Hauteur_pour_PDA,k,Hauteur_reference,o,Rayon_p,group_data_cube_float) {

   // console.log(group_data_cube_float)
    
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


Z2_PTSS=Z2_PTS(X, Y, X0_pda, Y0_pda,Z0_pda, Hauteur_PDA_2,Hauteur_reference,Rayon_p);

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



function programme_principal(Rayon_p,group_data_cube_float,group_data_cube,Nombre_points) {

    test_snp=1;

    group_data_cube_float = group_data_cube_float;
    group_data_cube = group_data_cube;




//delete_points();

//Rayon_p = parseFloat(document.getElementById('rayon-sphere-fictive').value);

var Z=[];
var positions= [];
snp=[];
var o1=null;


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


var X_min =0.;// X0_1 - Rayon - Rayon_P_M; 
var X_max = Rayon+Rayon_P_M;//X0_1 + Rayon + Rayon_P_M;
var Y_min = 0;//Math.PI;//Y0_1 - Rayon - Rayon_P_M;
var Y_max = 2*Math.PI;//Y0_1 + Rayon + Rayon_P_M;
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


var X_min =0.;// X0_1 - Rayon - Rayon_P_M; 
var X_max = Rayon+Rayon_P_M;//X0_1 + Rayon + Rayon_P_M;
var Y_min = 0;//Math.PI;//Y0_1 - Rayon - Rayon_P_M;
var Y_max = 2*Math.PI;//Y0_1 + Rayon + Rayon_P_M;
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


var X_min = 0;//X0_1 - Rayon_max - Rayon_p; 
var X_max = Rayon_max + Rayon_p;//X0_1 + Rayon_max + Rayon_p;
var Y_min = 0.;//Y0_1 - Rayon_max - Rayon_p;
var Y_max = 2*Math.PI;//Y0_1 + Rayon_max + Rayon_p;
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
var Y_min = 0;//Y0_1 - Rayon_max - Rayon_p;
var Y_max = Math.PI;//Y0_1 + Rayon_max + Rayon_p;
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

var X_min = 0;//X0_1 - Rayon_max - Rayon_p; 
var X_max = Rayon + Rayon_p;//X0_1 + Rayon_max + Rayon_p;
var Y_min = 0.;//Y0_1 - Rayon_max - Rayon_p;
var Y_max = 2*Math.PI;//Y0_1 + Rayon_max + Rayon_p;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points

//var X_min = X0_1 - Rayon - Rayon_p; 
//var X_max = X0_1 + Rayon + Rayon_p;
//var Y_min = Y0_1 - Rayon - Rayon_p;
//var Y_max = Y0_1 + Rayon + Rayon_p;
//var Deltax = (X_max - X_min) / Nombre_points
//var Deltay = (Y_max - Y_min) / Nombre_points


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
var Y_min = 0;//Y0_1 - Rayon_max - Rayon_p;
var Y_max = Math.PI;//Y0_1 + Rayon_max + Rayon_p;
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
       
    output=Z2_R(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].Longueur_bat_1, group_data_cube_float[o].Largeur_bat_1, group_data_cube_float[o].Hauteur_bat_1, -group_data_cube_float[o].alpha,Rayon_p);
    Z[o]=output.Z2_RR;
    Hauteur_pour_PDA=output.Z2_RR0;

    } else if (group_data_cube_float[o].group_name==='group_sphere') {
        //var X1=X*Math.cos(Y)+X0_1;
        //var Y1=X*Math.sin(Y)+Y0_1;

        const theta = (2 * Math.PI * i) / Nombre_points; // Angle azimutal de 0 à 2π
        const phi = (Math.PI * j) / (Nombre_points - 1); // Angle polaire de 0 à π
        // Coordonnées cartésiennes
        var X1 = (group_data_cube_float[o].Rayon+Rayon_p) * Math.sin(phi) * Math.cos(theta)+group_data_cube_float[o].x0_1;
        var Y1 = (group_data_cube_float[o].Rayon+Rayon_p) * Math.sin(phi) * Math.sin(theta)+group_data_cube_float[o].y0_1;
  
        output=Z2_SP(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Rayon,Rayon_p); 
        Z[o]=output.Z2_SPP;
        Hauteur_pour_PDA=output.Z2_SPP0;
       

    } else if (group_data_cube_float[o].group_name==='group_cylinder_sp') {
        //var X1=X*Math.cos(Y)+X0_1;
        //var Y1=X*Math.sin(Y)+Y0_1;

        const theta = (2 * Math.PI * i) / Nombre_points; // Angle azimutal de 0 à 2π
        const phi = (Math.PI * j) / (Nombre_points - 1); // Angle polaire de 0 à π
        // Coordonnées cartésiennes
        var X1 = (group_data_cube_float[o].Rayon+Rayon_p) * Math.sin(phi) * Math.cos(theta)+group_data_cube_float[o].x0_1;
        var Y1 = (group_data_cube_float[o].Rayon+Rayon_p) * Math.sin(phi) * Math.sin(theta)+group_data_cube_float[o].y0_1;

        output=Z2_CY_SP(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon,Rayon_p); 
        Z[o]=output.Z2_CY_SPP;
        Hauteur_pour_PDA=output.Z2_CY_SPP0;

    } else if (group_data_cube_float[o].group_name==='group_cylinder') {

        var X1=X*Math.cos(Y)+X0_1;
        var Y1=X*Math.sin(Y)+Y0_1;
        //var X1=X;
        //var Y1=Y;

        output=Z2_CY(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon_sup,group_data_cube_float[o].Rayon_inf,Rayon_p); 
        Z[o]=output.Z2_CYY;
        Hauteur_pour_PDA=output.Z2_CYY0;

    } else if (group_data_cube_float[o].group_name==='group_cylinderh') {
        
        var X1=(X-X0_1)*Math.cos(alpha)-((group_data_cube_float[o].Rayon+Rayon_p)*Math.cos(Y))*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+((group_data_cube_float[o].Rayon+Rayon_p)*Math.cos(Y))*Math.cos(alpha)+Y0_1

        output=Z2_CYH (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1,group_data_cube_float[o].z0_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Rayon,-group_data_cube_float[o].alpha,Rayon_p);
        Z[o]=output.Z2_CYHH;
        Hauteur_pour_PDA=output.Z2_CYHH0;    
        //positions.push(X1,Z[o],Y1);
 

    } else if (group_data_cube_float[o].group_name==='group_cone') {
        var X1=X*Math.cos(Y)+X0_1;
        var Y1=X*Math.sin(Y)+Y0_1;
        //var X1=X;
        //var Y1=Y;

        output=Z2_CONE(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon,Rayon_p); 
        Z[o]=output.Z2_CONEE;
        Hauteur_pour_PDA=output.Z2_CONEE0;

    } else if (group_data_cube_float[o].group_name==='group_cube_cy') {

        var X1=(X-X0_1)*Math.cos(alpha)-((group_data_cube_float[o].Largeur_bat_1/2+Rayon_p)*Math.cos(Y))*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+((group_data_cube_float[o].Largeur_bat_1/2+Rayon_p)*Math.cos(Y))*Math.cos(alpha)+Y0_1
        
        //var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
        //var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1


        output=Z2_CUBE_CY (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Largeur_bat_1,group_data_cube_float[o].Hauteur_bat_1,-group_data_cube_float[o].alpha,Rayon_p);
        Z[o]=output.Z2_CUBE_CYY;
        Hauteur_pour_PDA=output.Z2_CUBE_CYY0;     
 

    } else if (group_data_cube_float[o].group_name==='group_cube_f') {
        
        var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1

        output=Z2_CUBE_F (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1,group_data_cube_float[o].yf_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Largeur_bat_1,group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].HauteurMax_bat_1,-group_data_cube_float[o].alpha,Rayon_p);
        Z[o]=output.Z2_CUBE_FF;
        Hauteur_pour_PDA=output.Z2_CUBE_FF0;    
       

    } else if (group_data_cube_float[o].group_name==='group_ca') {
        
        var X1=(X-X0_C)*Math.cos(alpha_C)-(Y-Y0_C)*Math.sin(alpha_C)+X0_C
        var Y1=(X-X0_C)*Math.sin(alpha_C)+(Y-Y0_C)*Math.cos(alpha_C)+Y0_C

        output=Z2_CA (X1, Y1, group_data_cube_float[o].X0_C, group_data_cube_float[o].Y0_C,group_data_cube_float[o].Z0_C,group_data_cube_float[o].Longueur_C, group_data_cube_float[o].Hauteur_C_1,group_data_cube_float[o].Hauteur_C_2,group_data_cube_float[o].Sag_C,-group_data_cube_float[o].alpha_C,Deltay,Rayon_p);
        Z[o]=output.Z2_CATENARY;
        Hauteur_pour_PDA=output.Z2_CATENARY0;
        X3=output.X3;
        h1=output.h1;
               

    } 
    

    
    
    
    ////ADD STRUCTURES 

    for (let k = 0; k <= group_data_cube_float.length-1; k++) {

        

        if (k === o || group_data_cube_float[k].prevSpec=='Ignorée') {
        continue; // Skip this iteration
        }

 
        if (group_data_cube_float[k].group_name==='group_cube') {

            output=Z2_R(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].Longueur_bat_1, group_data_cube_float[k].Largeur_bat_1, group_data_cube_float[k].Hauteur_bat_1,-group_data_cube_float[k].alpha,Rayon_p);
            Z[k]=output.Z2_RR;

        } else if (group_data_cube_float[k].group_name==='group_pts') {
            
           

            output=Z2_PTS(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].z0_1,group_data_cube_float[k].Hauteur_bat_1,Z[o],Rayon_p);
            Z[k]=output;

        } else if (group_data_cube_float[k].group_name==='group_pda') {

                       
            output=Z2_PDA(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].z0_1,group_data_cube_float[k].Hauteur_bat_1,Hauteur_pour_PDA,k,Z[o],o,Rayon_p,group_data_cube_float);
            Z[k]=output;

        }  else if (group_data_cube_float[k].group_name==='group_sphere') {

            output=Z2_SP(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Rayon,Rayon_p); 
            Z[k]=output.Z2_SPP;

        } else if (group_data_cube_float[k].group_name==='group_cylinder_sp') {

            output=Z2_CY_SP(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Hauteur_bat_1, group_data_cube_float[k].Rayon,Rayon_p); 
            Z[k]=output.Z2_CY_SPP;

        } else if (group_data_cube_float[k].group_name==='group_cylinder') {

            output=Z2_CY(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Hauteur_bat_1, group_data_cube_float[k].Rayon_sup,group_data_cube_float[k].Rayon_inf,Rayon_p); 
            Z[k]=output.Z2_CYY;

        } else if (group_data_cube_float[k].group_name==='group_cylinderh') {

            output=Z2_CYH (X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].z0_1, group_data_cube_float[k].Longueur_bat_1, group_data_cube_float[k].Rayon, -group_data_cube_float[k].alpha,Rayon_p); 
            Z[k]=output.Z2_CYHH;

        } else if (group_data_cube_float[k].group_name==='group_cone') {

            output=Z2_CONE(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Hauteur_bat_1, group_data_cube_float[k].Rayon,Rayon_p); 
            Z[k]=output.Z2_CONEE;

        } else if (group_data_cube_float[k].group_name==='group_cube_cy') {

            output=Z2_CUBE_CY (X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].Longueur_bat_1, group_data_cube_float[k].Largeur_bat_1, group_data_cube_float[k].Hauteur_bat_1, -group_data_cube_float[k].alpha,Rayon_p); 
            Z[k]=output.Z2_CUBE_CYY;

        } else if (group_data_cube_float[k].group_name==='group_cube_f') {

            output=Z2_CUBE_F (X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].yf_1, group_data_cube_float[k].Longueur_bat_1,group_data_cube_float[k].Largeur_bat_1,group_data_cube_float[k].Hauteur_bat_1,group_data_cube_float[k].HauteurMax_bat_1,-group_data_cube_float[k].alpha,Rayon_p);
            Z[k]=output.Z2_CUBE_FF;

        } else if (group_data_cube_float[k].group_name==='group_ca') {

            output=Z2_CA (X1, Y1, group_data_cube_float[k].X0_C, group_data_cube_float[k].Y0_C,group_data_cube_float[k].Z0_C,group_data_cube_float[k].Longueur_C, group_data_cube_float[k].Hauteur_C_1,group_data_cube_float[k].Hauteur_C_2,group_data_cube_float[k].Sag_C,-group_data_cube_float[k].alpha_C,Deltay,Rayon_p,group_data_cube_float);
            Z[k]=output.Z2_CATENARY

        } 


        if (Z[k]>=Z4) {
            Z4=Z[k];

        }

    }

        if (Z[o] >= Z4 && Z[o] > Rayon_p){

            

           if (group_data_cube_float[o].group_name==='group_cube') {

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }

            

            var XO = X0_1 - Longueur_bat_1 / 2;
            var XE = X0_1 + Longueur_bat_1 / 2;
            var YN = Y0_1 + Largeur_bat_1 / 2;
            var YS = Y0_1 - Largeur_bat_1 / 2;
            var XORR = X0_1 - Longueur_bat_1 / 2 - Rayon_P_M;
            var XER = X0_1 + Longueur_bat_1 / 2 + Rayon_P_M;
            var YNR = Y0_1 + Largeur_bat_1 / 2 + Rayon_P_M;
            var YSR = Y0_1 - Largeur_bat_1 / 2 - Rayon_P_M;

            var XON = (X0_1 - Longueur_bat_1 / 2-X0_1)*Math.cos(alpha)-(Y0_1 + Largeur_bat_1 / 2-Y0_1)*Math.sin(alpha)+X0_1;
            var YON = (X0_1 - Longueur_bat_1 / 2-X0_1)*Math.sin(alpha)+(Y0_1 + Largeur_bat_1 / 2-Y0_1)*Math.cos(alpha)+Y0_1;

            var XOS = (X0_1 - Longueur_bat_1 / 2-X0_1)*Math.cos(alpha)-(Y0_1 - Largeur_bat_1 / 2-Y0_1)*Math.sin(alpha)+X0_1;
            var YOS = (X0_1 - Longueur_bat_1 / 2-X0_1)*Math.sin(alpha)+(Y0_1 - Largeur_bat_1 / 2-Y0_1)*Math.cos(alpha)+Y0_1;

            var XES = (X0_1 + Longueur_bat_1 / 2-X0_1)*Math.cos(alpha)-(Y0_1 - Largeur_bat_1 / 2-Y0_1)*Math.sin(alpha)+X0_1;
            var YES = (X0_1 + Longueur_bat_1 / 2-X0_1)*Math.sin(alpha)+(Y0_1 - Largeur_bat_1 / 2-Y0_1)*Math.cos(alpha)+Y0_1;

            var XEN = (X0_1 + Longueur_bat_1 / 2-X0_1)*Math.cos(alpha)-(Y0_1 + Largeur_bat_1 / 2-Y0_1)*Math.sin(alpha)+X0_1;
            var YEN = (X0_1 + Longueur_bat_1 / 2-X0_1)*Math.sin(alpha)+(Y0_1 + Largeur_bat_1 / 2-Y0_1)*Math.cos(alpha)+Y0_1;

            X2=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
            Y2=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

        if (X2 >= XO && X2 <= XE && Y2 >= YS && Y2 <= YN) {
                   
            positions.push(X1,Hauteur_bat_1+0.05,Y1);

        }
                        
        else if (X2 >= XORR && X2 <= XO && Y2 >= YN && Y2 <= YNR) {


            positions.push(XON,Hauteur_bat_1+0.05,YON);

        }

        else if (X2 >= XORR && X2 <= XO && Y2 <= YS && Y2 >= YSR) {


            positions.push(XOS,Hauteur_bat_1+0.05,YOS);


        }

        else if (X2 >= XE && X2 <= XER && Y2 >= YN && Y2 <= YNR) {


            positions.push(XEN,Hauteur_bat_1+0.05,YEN);


        }

        else if (X2 >= XE && X2 <= XER && Y2 <= YS && Y2 >= YSR) {


            positions.push(XES,Hauteur_bat_1+0.05,YES);


        }

        else if (X2 >= XORR && X2 <= XO && Y2 >= YS && Y2 <= YN) {
            //kk = kk + 1;
            X3=(X0_1 - Longueur_bat_1 / 2 - X0_1)*Math.cos(alpha)-(Y2-Y0_1)*Math.sin(alpha)+X0_1;
            Y3=(X0_1 - Longueur_bat_1 / 2 - X0_1)*Math.sin(alpha)+(Y2-Y0_1)*Math.cos(alpha)+Y0_1;

            positions.push(X3,Hauteur_bat_1+0.05,Y3);


        }

        else if (X2 <= XER && X2 >= XE && Y2 >= YS && Y2 <= YN) {

            X3=(X0_1 + Longueur_bat_1 / 2-X0_1)*Math.cos(alpha)-(Y2-Y0_1)*Math.sin(alpha)+X0_1;

            Y3=(X0_1 + Longueur_bat_1 / 2-X0_1)*Math.sin(alpha)+(Y2-Y0_1)*Math.cos(alpha)+Y0_1;

            positions.push(X3,Hauteur_bat_1+0.05,Y3);


        }

        else if (X2 <= XE && X2 >= XO && Y2 <= YNR && Y2 >= YN) {
            //kk = kk + 1;
            X3=(X2-X0_1)*Math.cos(alpha)-(Y0_1+Largeur_bat_1/2-Y0_1)*Math.sin(alpha)+X0_1;
    
            Y3=(X2-X0_1)*Math.sin(alpha)+(Y0_1+Largeur_bat_1/2-Y0_1)*Math.cos(alpha)+Y0_1;

            
            positions.push(X3,Hauteur_bat_1+0.05,Y3);


        }

        else if (X2 <= XE && X2 >= XO && Y2 >= YSR && Y2 <= YS) {

            X3=(X2-X0_1)*Math.cos(alpha)-(Y0_1-Largeur_bat_1/2-Y0_1)*Math.sin(alpha)+X0_1
            
            Y3=(X2-X0_1)*Math.sin(alpha)+(Y0_1-Largeur_bat_1/2-Y0_1)*Math.cos(alpha)+Y0_1


            positions.push(X3,Hauteur_bat_1+0.05,Y3);

        }

        
        


    } else if (group_data_cube_float[o].group_name==='group_sphere') {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }



        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

 
        if (r<=Rayon_P_M) {
        

            X_S=Rayon*((X1-X0_1)/ (Rayon_p+Rayon))+X0_1;
            Z_S=Rayon* Math.sin(Math.acos(r / (Rayon_p+Rayon)))+Z0_1+0.05;
            Y_S=Rayon*((Y1-Y0_1)/(Rayon_p+Rayon))+Y0_1;

           // console.log('X',X_S,'Z',Z_S,'Y',Y_S);


            positions.push(X_S,Z_S,Y_S);
            


        } 

        

        
        


    } else if (group_data_cube_float[o].group_name==='group_cylinder_sp') {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }




        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));


        if (r<=Rayon_P_M) {


            X_S=Rayon*((X1-X0_1)/ (Rayon_p+Rayon))+X0_1;
            Z_S=Rayon* Math.sin(Math.acos(r / (Rayon_p+Rayon)))+Hauteur_bat_1+0.05;
            Y_S=Rayon*((Y1-Y0_1)/(Rayon_p+Rayon))+Y0_1;

            


            positions.push(X_S,Z_S,Y_S);
            //positions.push(X1,Hauteur_pour_PDA+0.05,Y1);


        } 

        


    } else if (group_data_cube_float[o].group_name==='group_cylinder') {
        

        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

        if (Rayon_sup===Rayon_inf) {

            alpha=Math.PI/2;

        } else {

            alpha=Math.atan((Hauteur_bat_1-Z0_1)/Math.abs(Rayon_sup-Rayon_inf));

        }

    if (Rayon_sup>=Rayon_inf) {

    if (r>=0 && r<Rayon_sup) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }






        X_CY=X1;//Rayon*((X1-X0_1)/ (Rayon_p+Rayon))+X0_1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=Y1;//Rayon*((Y1-Y0_1)/(Rayon_p+Rayon))+Y0_1;


        positions.push(X_CY,Z_CY,Y_CY);
        
        
      

    } else if (r>=Rayon_sup && r<=Rayon_p+Rayon_sup) {

        if (spec==='Ceinturée') {

            continue
        }

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        



        X_CY=Rayon_sup*((X1-X0_1)/r)+X0_1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=Rayon_sup*((Y1-Y0_1)/r)+Y0_1;


        positions.push(X_CY,Z_CY,Y_CY);
        
        

    } 


    } else {



    if (r>=0 && r<Rayon_sup) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        X_CY=X1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=Y1;





        positions.push(X_CY,Z_CY,Y_CY);
      
        

    } else if (r>=Rayon_sup && r < Rayon_p*Math.sin(alpha)+Rayon_sup) {
        
        if (spec==='Ceinturée') {

            continue
        }

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        X_CY=Rayon_sup*((X1-X0_1)/r)+X0_1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=Rayon_sup*((Y1-Y0_1)/r)+Y0_1;



        positions.push(X_CY,Z_CY,Y_CY);
        
        


    } else if (r>=Rayon_inf+Rayon_p*Math.sin(alpha) && r <= Rayon_p+Rayon_inf) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        X_CY=Rayon_inf*((X1-X0_1)/r)+X0_1;
        Z_CY=Z0_1+0.05;
        Y_CY=Rayon_inf*((Y1-Y0_1)/r)+Y0_1;



        positions.push(X_CY,Z_CY,Y_CY);
        
        

    } else if (r>Rayon_p*Math.sin(alpha)+Rayon_sup && r<Rayon_inf+(Rayon_p)*Math.sin(alpha)) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        Zi=(r-Rayon_sup-Rayon_p*Math.sin(alpha))/Math.cos(alpha);

        Zf=Zi*Math.sin(alpha)-0*Math.cos(alpha);

        X_CY=((Zi*Math.cos(alpha))+Rayon_sup)*((X1-X0_1)/r)+X0_1;
        Z_CY=Hauteur_bat_1-Zf+0.05;
        Y_CY=((Zi*Math.cos(alpha))+Rayon_sup)*((Y1-Y0_1)/r)+Y0_1;




        positions.push(X_CY,Z_CY,Y_CY);
        
        

        

    } 

    }


    ////////

} else if (group_data_cube_float[o].group_name==='group_cylinderh') {





r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

XO = X0_1 - Longueur_bat_1 / 2;
XE = X0_1 + Longueur_bat_1 / 2;
XORR = X0_1 - Longueur_bat_1 / 2 - Rayon_p;
XER = X0_1 + Longueur_bat_1 / 2 + Rayon_p;
YNR = Y0_1+ Rayon + Rayon_p;
YSR = Y0_1 - Rayon - Rayon_p;
Y_Y0=(Rayon_p+Rayon)*Math.cos(Y);
YM = (Rayon_p+Rayon)*Math.cos(Y)+Y0_1;


if (X >= XO && X<=XE && YM >= YSR && YM <=YNR) {

    if (o!==o1) {

        snp.push(group_data_cube[o].text_new_item);
        o1=o;
    }


    X_CY=(X-X0_1)*Math.cos(alpha)-((Rayon)*(((Rayon_p+Rayon)*Math.cos(Y))/(Rayon_p+Rayon)))*Math.sin(alpha)+X0_1;
    Z_CY=Z0_1+(0*Rayon_p+Rayon)*Math.sin(Math.acos(Math.abs((Rayon_p+Rayon)*Math.cos(Y))/(Rayon_p+Rayon)))+0.05;
    Y_CY=(X-X0_1)*Math.sin(alpha)+((Rayon)*(((Rayon_p+Rayon)*Math.cos(Y))/(Rayon_p+Rayon)))*Math.cos(alpha)+Y0_1;
    positions.push(X_CY,Z_CY,Y_CY);
    //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
    
  



} else if (X >= XE && X<=XER && YM >= YSR && YM <=YNR) {

    if (spec==='Ceinturée') {

        continue
    }         
    
    if (o!==o1) {

        snp.push(group_data_cube[o].text_new_item);
        o1=o;
    }
      



    var Z_bat=Rayon+(Rayon_p)*Math.sin(Math.acos(Math.abs(X_R-(X0_1+Longueur_bat_1/2))/Rayon_p))
    

    if (Math.abs(Y_Y0) >= 0 && Math.abs(Y_Y0) <=Z_bat) {




        X_CY=(Longueur_bat_1/2)*Math.cos(alpha)-((Rayon)*(Y_Y0)/Z_bat)*Math.sin(alpha)+X0_1;
        
        Z_CY=(Rayon)*Math.cos(Math.asin(Math.abs(Y_Y0)/Z_bat))+Z0_1+0.05;
        Y_CY=(Longueur_bat_1/2)*Math.sin(alpha)+((Rayon)*(Y_Y0)/Z_bat)*Math.cos(alpha)+Y0_1;
        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);


}



} else if (X >= XORR && X<=XO && YM >= YSR && YM <=YNR) {

    if (spec==='Ceinturée') {

        continue
    }

    if (o!==o1) {

        snp.push(group_data_cube[o].text_new_item);
        o1=o;
    }       


    var Z_bat=Rayon+(Rayon_p)*Math.sin(Math.acos(Math.abs((X0_1-Longueur_bat_1/2)-X)/Rayon_p));

    
    if (Math.abs(Y_Y0) >= 0 && Math.abs(Y_Y0) <=Z_bat) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }    

        X_CY=(-Longueur_bat_1/2)*Math.cos(alpha)-((Rayon)*(Y_Y0)/Z_bat)*Math.sin(alpha)+X0_1;
        
        Z_CY=(Rayon)*Math.cos(Math.asin(Math.abs(Y_Y0)/Z_bat))+Z0_1+0.05;
        Y_CY=(-Longueur_bat_1/2)*Math.sin(alpha)+((Rayon)*(Y_Y0)/Z_bat)*Math.cos(alpha)+Y0_1;
        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
    }



} 




    } else if (group_data_cube_float[o].group_name==='group_cone') {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }



        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));


        alpha=Math.atan((Hauteur_bat_1-Z0_1)/Rayon);



        if (r>=0 && r < Rayon_p*Math.sin(alpha)) {



            X_CY=X0_1;
            Z_CY=Hauteur_bat_1+0.05;
            Y_CY=Y0_1;


            positions.push(X_CY,Z_CY,Y_CY);
            //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
            
            


        } else if (r>=Rayon+Rayon_p*Math.sin(alpha) && r <= Rayon_p+Rayon) {

            X_CY=Rayon*((X1-X0_1)/r)+X0_1;
            Z_CY=Z0_1+0.05;
            Y_CY=Rayon*((Y1-Y0_1)/r)+Y0_1;


            positions.push(X_CY,Z_CY,Y_CY);
            //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
            

            

        } else if (r>Rayon_p*Math.sin(alpha) && r<Rayon+(Rayon_p)*Math.sin(alpha)) {

            Zi=(r-Rayon_p*Math.sin(alpha))/Math.cos(alpha);

            Zf=Zi*Math.sin(alpha)-0*Math.cos(alpha);

            X_CY=((Zi*Math.cos(alpha))+0)*((X1-X0_1)/r)+X0_1;
            Z_CY=Hauteur_bat_1-Zf+0.05;
            Y_CY=((Zi*Math.cos(alpha))+0)*((Y1-Y0_1)/r)+Y0_1;



            positions.push(X_CY,Z_CY,Y_CY);
            //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
            
            



    } 





    } else if (group_data_cube_float[o].group_name==='group_cube_cy') {





        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

        XO = X0_1 - Longueur_bat_1 / 2;
        XE = X0_1 + Longueur_bat_1 / 2;
        XORR = X0_1 - Longueur_bat_1 / 2 - Rayon_p;
        XER = X0_1 + Longueur_bat_1 / 2 + Rayon_p;
        YNR = Y0_1+ Largeur_bat_1 / 2 + Rayon_p;
        YSR = Y0_1 - Largeur_bat_1 / 2 - Rayon_p;
        Y_Y0=(Rayon_p+Largeur_bat_1 / 2)*Math.cos(Y);
        YM = (Rayon_p+Largeur_bat_1 / 2)*Math.cos(Y)+Y0_1;


        if (X >= XO && X<=XE && YM >= YSR && YM <=YNR) {

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }


            X_CY=(X-X0_1)*Math.cos(alpha)-((Largeur_bat_1/2)*((Y_Y0)/(Rayon_p+Largeur_bat_1/2)))*Math.sin(alpha)+X0_1;
            Z_CY=Hauteur_bat_1+(0*Rayon_p+Largeur_bat_1/2)*Math.sin(Math.acos(Math.abs(Y_Y0)/(Rayon_p+Largeur_bat_1/2)))+0.05;
            Y_CY=(X-X0_1)*Math.sin(alpha)+((Largeur_bat_1/2)*((Y_Y0)/(Rayon_p+Largeur_bat_1/2)))*Math.cos(alpha)+Y0_1;
            
            positions.push(X_CY,Z_CY,Y_CY);
            //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);

            
          
        

    
        } else if (X >= XE && X<=XER && YM >= YSR && YM <=YNR) {

            if (spec==='Ceinturée') {

                continue
            }            

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }

            var Z_bat=Largeur_bat_1/2+(Rayon_p)*Math.sin(Math.acos(Math.abs(X_R-(X0_1+Longueur_bat_1/2))/Rayon_p));

            

            if (Math.abs(Y_Y0) >= 0 && Math.abs(Y_Y0) <=Z_bat) {




                


                X_CY=(Longueur_bat_1/2)*Math.cos(alpha)-((Largeur_bat_1/2)*(Y_Y0)/Z_bat)*Math.sin(alpha)+X0_1;
                
                Z_CY=(Largeur_bat_1/2)*Math.cos(Math.asin(Math.abs(Y_Y0)/Z_bat))+Hauteur_bat_1+0.05;
                Y_CY=(Longueur_bat_1/2)*Math.sin(alpha)+((Largeur_bat_1/2)*(Y_Y0)/Z_bat)*Math.cos(alpha)+Y0_1;
                positions.push(X_CY,Z_CY,Y_CY);
                //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
                


        }



        } else if (X >= XORR && X<=XO && YM >= YSR && YM <=YNR) {

            if (spec==='Ceinturée') {

                continue
            }

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }            


            var Z_bat=Largeur_bat_1/2+(Rayon_p)*Math.sin(Math.acos(Math.abs((X0_1-Longueur_bat_1/2)-X)/Rayon_p));

            
            if (Math.abs(Y_Y0) >= 0 && Math.abs(Y_Y0) <=Z_bat) {

                X_CY=(-Longueur_bat_1/2)*Math.cos(alpha)-((Largeur_bat_1/2)*(Y_Y0)/Z_bat)*Math.sin(alpha)+X0_1;
                
                Z_CY=(Largeur_bat_1/2)*Math.cos(Math.asin(Math.abs(Y_Y0)/Z_bat))+Hauteur_bat_1+0.05;
                Y_CY=(-Longueur_bat_1/2)*Math.sin(alpha)+((Largeur_bat_1/2)*(Y_Y0)/Z_bat)*Math.cos(alpha)+Y0_1;
                positions.push(X_CY,Z_CY,Y_CY);
                //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
                
            }



        } 



        






} else if (group_data_cube_float[o].group_name==='group_cube_f') {


    //var Z2_CUBE_FF=Rayon_p;


    alpha=-group_data_cube_float[o].alpha*Math.PI/180;
    //X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
    //Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

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

    if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y >=yf_min && Y <=yf_max) {

        if (spec==='Ceinturée') {

            continue
        }

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        //X_CY=X1;
        //Z_CY=zk;
        //Y_CY=Y1;

        X_CY=(X-X0_1)*Math.cos(alpha)-(YFF_1-Y0_1)*Math.sin(alpha)+X0_1;
        Z_CY=HauteurMAX_bat_1+0.05;
        Y_CY=(X-X0_1)*Math.sin(alpha)+(YFF_1-Y0_1)*Math.cos(alpha)+Y0_1;
               
        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);
        




    } else if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y >=ys_min && Y <=ys_max) {


        if (spec==='Ceinturée') {

            continue
        }

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }
        
        //X_CY=X1;
        //Z_CY=zk;
        //Y_CY=Y1;

        X_CY=(X-X0_1)*Math.cos(alpha)-(Largeur_bat_1/2)*Math.sin(alpha)+X0_1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=(X-X0_1)*Math.sin(alpha)+(Largeur_bat_1/2)*Math.cos(alpha)+Y0_1;

        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);

 

    } else if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y >=yn_min && Y <=yn_max) {

        if (spec==='Ceinturée') {

            continue
        }

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }


        //X_CY=X1;
        //Z_CY=zk;
        //Y_CY=Y1;

        X_CY=(X-X0_1)*Math.cos(alpha)-(-Largeur_bat_1/2)*Math.sin(alpha)+X0_1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=(X-X0_1)*Math.sin(alpha)+(-Largeur_bat_1/2)*Math.cos(alpha)+Y0_1;

        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);


        

    } else if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y >=yf_max && Y <=ys_min) {



        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        Zi=(Y-YFF_1-Rayon_p*Math.sin(alpha_F_1))/Math.cos(alpha_F_1);

        Zf=Zi*Math.sin(alpha_F_1)-0*Rayon_p*Math.cos(alpha_F_1);


        //X_CY=X1;
        //Z_CY=zk;
        //Y_CY=Y1;

        X_CY=(X-X0_1)*Math.cos(alpha)-(Zi*Math.cos(alpha_F_1)+YF_1)*Math.sin(alpha)+X0_1;
        Z_CY=HauteurMAX_bat_1-Zf+0.05;
        Y_CY=(X-X0_1)*Math.sin(alpha)+(Zi*Math.cos(alpha_F_1)+YF_1)*Math.cos(alpha)+Y0_1;

        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);





    } else if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y <=yf_min && Y >=yn_max) {



        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }
        Zi=(YFF_1-Y-Rayon_p*Math.sin(alpha_F_2))/Math.cos(alpha_F_2);

        Zf=Zi*Math.sin(alpha_F_2)-0*Rayon_p*Math.cos(alpha_F_2);

        //X_CY=X1;
        //Z_CY=zk;
        //Y_CY=Y1;

        X_CY=(X-X0_1)*Math.cos(alpha)-(-Zi*Math.cos(alpha_F_2)+YF_1)*Math.sin(alpha)+X0_1;
        Z_CY=HauteurMAX_bat_1-Zf+0.05;
        Y_CY=(X-X0_1)*Math.sin(alpha)+(-Zi*Math.cos(alpha_F_2)+YF_1)*Math.cos(alpha)+Y0_1;

        positions.push(X_CY,Z_CY,Y_CY);
        //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);





} else if (((X>=X0_1+Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2+Rayon_p) || (X<=X0_1-Longueur_bat_1/2 && X>=X0_1-Longueur_bat_1/2-Rayon_p)) && ((Y >=YFF_1-Rayon_p && Y <=YFF_1) || (Y <=YFF_1+Rayon_p && Y >=YFF_1))) {

        if (spec==='Ceinturée') {

            continue
        }



    if (X>=X0_1+Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2+Rayon_p) {

        var XX=X-X0_1-Longueur_bat_1/2;
        var Longueur_m=Longueur_bat_1/2;

    } else {

        var XX=X0_1-Longueur_bat_1/2-X;
        var Longueur_m=-Longueur_bat_1/2;


    }

    if (Y <=YFF_1+Rayon_p && Y >=YFF_1) {

        var alpha_FF=alpha_F_1;

    } else {

        var alpha_FF=alpha_F_2;


    }


    r=Math.sqrt(Math.pow(XX,2)+Math.pow(Y-YFF_1,2));
    Z_ref=Math.abs(Y-YFF_1)/Math.tan(alpha_FF);

    if (r<=Rayon_p) {

        Z1_bat_F=HauteurMAX_bat_1+Rayon_p*Math.sin(Math.acos(r/Rayon_p));

        if (Z1_bat_F>=HauteurMAX_bat_1+Z_ref) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }



            //X_CY=X1;
            //Z_CY=zk;
            //Y_CY=Y1;

            X_CY=(Longueur_m)*Math.cos(alpha)-(YFF_1-Y0_1)*Math.sin(alpha)+X0_1;
            Z_CY=HauteurMAX_bat_1+0.05;
            Y_CY=(Longueur_m)*Math.sin(alpha)+(YFF_1-Y0_1)*Math.cos(alpha)+Y0_1;

            positions.push(X_CY,Z_CY,Y_CY);
            //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);


            


        }




    } 




} 



if (((X>=X0_1+Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2+Rayon_p) || (X<=X0_1-Longueur_bat_1/2 && X>=X0_1-Longueur_bat_1/2-Rayon_p)) && ((Y <=Y0_1+Largeur_bat_1/2+Rayon_p && Y >=Y0_1+Largeur_bat_1/2) || ((Y >=Y0_1-Largeur_bat_1/2-Rayon_p) && (Y <=Y0_1-Largeur_bat_1/2)))) {

            if (spec==='Ceinturée') {

            continue
        }

        
if (X>=X0_1+Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2+Rayon_p) {

    var XX=X-X0_1-Longueur_bat_1/2;
    var Longueur_m=Longueur_bat_1/2;

} else {

    var XX=X0_1-Longueur_bat_1/2-X;
    var Longueur_m=-Longueur_bat_1/2;

}

if (Y <=Y0_1+Largeur_bat_1/2+Rayon_p && Y >=Y0_1+Largeur_bat_1/2)  {

    var YY=Y-Y0_1-Largeur_bat_1/2;
    var alpha_FF=alpha_F_1;
    var Largeur_m=Largeur_bat_1/2;

} else {

    var YY=Y0_1-Largeur_bat_1/2-Y;
    var alpha_FF=alpha_F_2;
    var Largeur_m=-Largeur_bat_1/2;

}

    r=Math.sqrt(Math.pow(XX,2)+Math.pow(YY,2));
    Z_ref=Math.abs(YY)/Math.tan(alpha_FF);

    if (r<=Rayon_p) {

        Z1_bat_F=Hauteur_bat_1+Rayon_p*Math.sin(Math.acos(r/Rayon_p));

        if (Z1_bat_F<=Hauteur_bat_1+Z_ref) {

        //Z2_CUBE_FF=Z1_bat_F;

 
            //X_CY=X1;
            //Z_CY=zk;
            //Y_CY=Y1;

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

            X_CY=(Longueur_m)*Math.cos(alpha)-(Largeur_m)*Math.sin(alpha)+X0_1;
            Z_CY=Hauteur_bat_1+0.05;
            Y_CY=(Longueur_m)*Math.sin(alpha)+(Largeur_m)*Math.cos(alpha)+Y0_1;

            positions.push(X_CY,Z_CY,Y_CY);
            //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);


            


    }




} 



} 

if (((X>=X0_1+Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2+Rayon_p)  || (X>=X0_1-Longueur_bat_1/2-Rayon_p && X<=X0_1-Longueur_bat_1/2)) && ((Y <=Y0_1+Largeur_bat_1/2+Rayon_p && Y >=YFF_1)  || (Y >=Y0_1-Largeur_bat_1/2-Rayon_p && Y <=YFF_1)))  {

    
    if (spec==='Ceinturée') {

continue
}

    if (X>=X0_1+Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2+Rayon_p) {

    var XX=X-X0_1-Longueur_bat_1/2;
    var Longueur_m=Longueur_bat_1/2;

    } else {

    var XX=X0_1-Longueur_bat_1/2-X;
    var Longueur_m=-Longueur_bat_1/2;


    }

    if (Y <=Y0_1+Largeur_bat_1/2+Rayon_p && Y >=YFF_1) {

    var YY=Y-Y0_1-Largeur_bat_1/2;
    var YY0=Y0_1+Largeur_bat_1/2-YFF_1;
    var YY1=YFF_1-Y;
    var alpha_FF=alpha_F_1;
    var Largeur_m=Largeur_bat_1/2;
    var ii=1
    


    } else {

    var YY=Y0_1-Largeur_bat_1/2-Y;
    var YY0=-Y0_1+Largeur_bat_1/2+YFF_1;
    var YY1=-YFF_1+Y;
    var alpha_FF=alpha_F_2;
    var Largeur_m=-Largeur_bat_1/2;
    var ii=-1

    }

 

var lo_1=Math.sqrt(Math.pow(HauteurMAX_bat_1-Hauteur_bat_1,2)+Math.pow(YY0,2));

var cef=Math.asin((XX)/(Rayon_p));
var cef1=Math.cos(cef);
var zi=(Rayon_p*cef1*Math.sin(alpha_FF)+YY1)/Math.cos(alpha_FF)+HauteurMAX_bat_1;

if ((zi>=HauteurMAX_bat_1-lo_1) && (zi<=HauteurMAX_bat_1)) {


    //X_CY=X1;
    //Z_CY=zk;
    //Y_CY=Y1;

           if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

    X_CY=(Longueur_m)*Math.cos(alpha)-(ii*(HauteurMAX_bat_1-zi)*Math.cos(alpha_FF)+YF_1)*Math.sin(alpha)+X0_1;
    Z_CY=HauteurMAX_bat_1-(HauteurMAX_bat_1-zi)*Math.sin(alpha_FF)+0.05;
    Y_CY=(Longueur_m)*Math.sin(alpha)+(ii*(HauteurMAX_bat_1-zi)*Math.cos(alpha_FF)+YF_1)*Math.cos(alpha)+Y0_1; 

    positions.push(X_CY,Z_CY,Y_CY);
    //positions.push(X_CY,Hauteur_pour_PDA+0.05,Y_CY);


    


} 



} 











} else if (group_data_cube_float[o].group_name==='group_ca') {

    if (o!==o1) {

        snp.push(group_data_cube[o].text_new_item);
        o1=o;

    }

    X1_CA=X3;
    
    Z1_CA=h1;

    X_CA=(X1_CA-X0_C)*Math.cos(alpha_C)-(0)*Math.sin(alpha_C)+X0_C;
    Z_CA=Z1_CA+0.05;//HauteurMAX_bat_1-(HauteurMAX_bat_1-zi)*Math.sin(alpha_FF)+0.05;
    Y_CA=(X1_CA-X0_C)*Math.sin(alpha_C)+(0)*Math.cos(alpha_C)+Y0_C;
    

    //X_CA_1=X1;
    //Y_CA_1=Y1;
    //Z_CA_1=Z[o];



    positions.push(X_CA,Z_CA,Y_CA);
    //positions.push(X_CA_1,Z_CA_1,Y_CA_1);


    

}    ///ADD STRUCTURES //////////////////////






        } 







    }






  

}




    
    




}


return {positions,snp} 

}


// Exporter la fonction pour pouvoir l'utiliser dans d'autres fichiers
module.exports = {
    programme_principal
};

