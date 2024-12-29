
////////////////////////////////////////////////////////////////////////////// OFFSETS STRUCTURE CUBIQUE//////////////////////////

function Z2_SP(X, Y, X0_1, Y0_1, Z0_1, Rayon,Rayon_p) {


    r = Math.sqrt(Math.pow(X - X0_1,2) + Math.pow(Y - Y0_1,2));

    if (r<=Rayon) {

        Z2_SPP=Z0_1 + (Rayon) * Math.sin(Math.acos(r / (Rayon)));

    } else {

        Z2_SPP=0.;
    }


    return {Z2_SPP};
  


}

function Z2_CY_SP(X, Y, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon,Rayon_p) {




r = Math.sqrt(Math.pow(X - X0_1,2) + Math.pow(Y - Y0_1,2));

if (r<=Rayon) {

    Z2_CY_SPP0=Hauteur_bat_1 + (Rayon) * Math.sin(Math.acos(r / (Rayon)));

} else {

    Z2_CY_SPP0=0;

}



return Z2_CY_SPP0;




}


function Z2_CY(X, Y, X0_1, Y0_1, Z0_1, Hauteur_bat_1,Rayon_sup,Rayon_inf,Rayon_p) {

    r = Math.sqrt(Math.pow(X - X0_1,2) + Math.pow(Y - Y0_1,2));

    if (Rayon_sup===Rayon_inf) {

        alpha=Math.PI/2;


    } else {

        alpha=Math.atan((Hauteur_bat_1-Z0_1)/Math.abs(Rayon_sup-Rayon_inf));

    }

    if (Rayon_sup>=Rayon_inf) {

        if (r>=0 && r<=Rayon_sup) {

            Z2_CYY0=Hauteur_bat_1;
            

        } else {

            Z2_CYY0=0.;
        }



    } else {

    

    if (r>=0 && r<=Rayon_sup) {

        Z2_CYY0=Hauteur_bat_1;

    } else if (r>Rayon_sup && r<=Rayon_inf) {

        Zi=(r-Rayon_sup)/Math.cos(alpha);

        Z2_CYY0=Hauteur_bat_1-Zi*Math.sin(alpha);


    } else {

        Z2_CYY0=0.;


    }




    }


    return Z2_CYY0;

}

function Z2_CYH (X1, Y1, X0_1, Y0_1,Z0_1, Longueur_bat_1,Rayon,alpha,Rayon_p) {
   
   var Z2_CYHH0=0.;
   

   alpha=alpha*Math.PI/180;
   X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
   Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

   r = Math.sqrt(Math.pow(X_R - X0_1,2) + Math.pow(Y_R - Y0_1,2));

   XO = X0_1 - Longueur_bat_1 / 2;
   XE = X0_1 + Longueur_bat_1 / 2;
   YN = Y0_1+ Rayon;
   YS = Y0_1 - Rayon;

if (X_R >= XO && X_R<=XE && Y_R >= YS && Y_R <=YN) {

    Z2_CYHH0=Z0_1+(Rayon)*Math.sin(Math.acos(Math.abs(Y_R-Y0_1)/(Rayon)));
   
} else {

    Z2_CYHH0=0.;

}





return Z2_CYHH0;



}



function Z2_CONE (X1, Y1, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon,Rayon_p) {


    r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

    alpha=Math.atan((Hauteur_bat_1-Z0_1)/Rayon);

    if (r>=0 && r<=Rayon) {

        Zi=r/Math.cos(alpha);


        Z2_CONEE0=Hauteur_bat_1-Zi*Math.sin(alpha);



    } else {

        Z2_CONEE0=0.;


    }




   

 


    return Z2_CONEE0;


} 


function Z2_CUBE_CY (X1, Y1, X0_1, Y0_1, Longueur_bat_1,Largeur_bat_1,Hauteur_bat_1,alpha,Rayon_p) {
   

    var Z2_CUBE_CYY0=0;


    alpha=alpha*Math.PI/180;
    X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
    Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

    r = Math.sqrt(Math.pow(X_R - X0_1,2) + Math.pow(Y_R - Y0_1,2));

    XO = X0_1 - Longueur_bat_1 / 2;
    XE = X0_1 + Longueur_bat_1 / 2;
    YN = Y0_1+ Largeur_bat_1 / 2;
    YS = Y0_1 - Largeur_bat_1 / 2



    if (X_R >= XO && X_R<=XE && Y_R >= YS && Y_R <=YN) {


        Z2_CUBE_CYY0=Hauteur_bat_1+(Largeur_bat_1/2)*Math.sin(Math.acos(Math.abs(Y_R-Y0_1)/(Largeur_bat_1/2)));

      
  

    } 




return Z2_CUBE_CYY0;


}


/////////////////////////////////////////

function Z2_CUBE_F (X1, Y1, X0_1, Y0_1,YF_1,Longueur_bat_1,Largeur_bat_1,Hauteur_bat_1,HauteurMAX_bat_1,alpha,Rayon_p) {


   var Z2_CUBE_FF0=0.;

   alpha=alpha*Math.PI/180;
   X_R=(X1-X0_1)*Math.cos(-alpha)-(Y1-Y0_1)*Math.sin(-alpha)+X0_1;
   Y_R=(X1-X0_1)*Math.sin(-alpha)+(Y1-Y0_1)*Math.cos(-alpha)+Y0_1;

   alpha_F_1=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2-YF_1));
   alpha_F_2=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2+YF_1));
   
   YFF_1=YF_1+Y0_1;
 

    if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R >=YFF_1 && Y_R <=Y0_1+Largeur_bat_1/2) {

        Zi=(Y_R-YFF_1)/Math.cos(alpha_F_1);

        Zf=Zi*Math.sin(alpha_F_1)-Rayon_p*Math.cos(alpha_F_1);

        Z2_CUBE_FF0=HauteurMAX_bat_1-Zi*Math.sin(alpha_F_1);


    } else if (X_R>=X0_1-Longueur_bat_1/2 && X_R<=X0_1+Longueur_bat_1/2  && Y_R <=YFF_1 && Y_R >=Y0_1-Largeur_bat_1/2) {

        Zi=(YFF_1-Y_R)/Math.cos(alpha_F_2);

        Z2_CUBE_FF0=HauteurMAX_bat_1-Zi*Math.sin(alpha_F_2);


    } 
    



////////////////////////////


   

return Z2_CUBE_FF0;

}


function Z2_CA(x,y,X0_C,Y0_C,Z0_C,Longueur_C,Hauteur_C_1,Hauteur_C_2,Sag_C,alpha_C,deltay,Rayon_p) {

   var X3;
   var X2;
   var h1;
   var Z2_CATENARY0=0.;


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
        Z2_CATENARY0=h;

        


    } else {

        h=0.;


    }

    }



return Z2_CATENARY0;

}



//////////////////

        

function Z2_R (X1, Y1, X0_2, Y0_2, Longueur_bat_2, Largeur_bat_2, Hauteur_bat_2,alpha,Rayon_p) {
    alpha=alpha*Math.PI/180;
    X_R=(X1-X0_2)*Math.cos(-alpha)-(Y1-Y0_2)*Math.sin(-alpha)+X0_2;
    Y_R=(X1-X0_2)*Math.sin(-alpha)+(Y1-Y0_2)*Math.cos(-alpha)+Y0_2;

    XO = X0_2 - Longueur_bat_2 / 2;
    XE = X0_2 + Longueur_bat_2 / 2;
    YN = Y0_2 + Largeur_bat_2 / 2;
    YS = Y0_2 - Largeur_bat_2 / 2;

    if (X_R >= XO && X_R <= XE && Y_R >= YS && Y_R <= YN) {
        Z2_RR = Hauteur_bat_2;
        Z2_RR0 = Hauteur_bat_2;

    } else {

        Z2_RR = 0.;
        Z2_RR0=0.;


    }

    
    return {Z2_RR0};

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////OFFSECT PDA /////////////////////////////////////////////////////////////


function Z2_PDA(X, Y, X0_pda, Y0_pda,Z0_pda, Hauteur_PDA_2,Hauteur_pour_PDA,k,Hauteur_reference,o,Rayon_p,group_data_cube_float) {

    
var DeltaL=group_data_cube_float[k].DeltaT;
var Rayon_protection;
var Z2_PDAA;


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


var Delta = Hauteur_PDA_2 - Hauteur_pour_PDA;

if (Delta<2.0) {

    Rayon_protection=0.;


} else if (Delta>=2.0 && Delta<=5.0) {

    Rayon_protection = coefficient_reducteur*Math.sqrt(2 * Rayon_p * Hauteur_limite_2 - Math.pow(Hauteur_limite_2,2) + Rayon_PDA * (2 * Rayon_p + Rayon_PDA)) * Delta / Hauteur_limite_2;


} else {


    Rayon_protection = coefficient_reducteur*Math.sqrt(2 * Rayon_p * Delta - Math.pow(Delta,2) + Rayon_PDA * (2 * Rayon_p + Rayon_PDA));
    
}


const r=Math.sqrt(Math.pow(X-X0_pda,2)+Math.pow(Y-Y0_pda,2));


if (r<Rayon_protection) {

Z2_PDAA=true;

} else {

Z2_PDAA=false;

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

        Z2_PDAA = false;


    }

}



} else if (group_data_cube_float[o].group_name=='group_cylinder_sp') {

Rayon_sphere=group_data_cube_float[o].Rayon;
x0_1=group_data_cube_float[o].x0_1;
y0_1=group_data_cube_float[o].y0_1;
Hauteur_bat_1=group_data_cube_float[o].Hauteur_bat_1;
rr=Math.sqrt(Math.pow(X0_pda-x0_1,2)+Math.pow(Y0_pda-y0_1,2));

if (rr<=Rayon_sphere) {

    ZZ0 = Hauteur_bat_1 + (Rayon_sphere) * Math.sin(Math.acos(rr / (Rayon_sphere)));

    if (Hauteur_PDA_2-ZZ0<2) {

        Z2_PDAA = false;


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

        Z2_PDAA = false;

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

         Z2_PDAA = false;

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

        Z2_PDAA = false;

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

        Z2_PDAA = false;

    }

} else if (X00_pda >= XO && X00_pda <=XE && Y00_pda >= YFF_1 && Y00_pda <=YN) {

    ZZ0=Hauteur_bat_1+(y0_1+Largeur_bat_1/2-Y00_pda)*Math.tan(alpha_F_1);

    if (Hauteur_PDA_2-ZZ0<2.) {

        Z2_PDAA = false;

    }

}


}





return Z2_PDAA;




}


function programme_principal(Rayon_p,group_data_cube_float,group_data_cube,Nombre_points) {

    test_snp=1;

    group_data_cube_float = group_data_cube_float;
    group_data_cube = group_data_cube;

    var Z=[];
    var positions= [];
    snp=[];

var o1=null;


    //var output;

    


//delete_points();

//Rayon_p = parseFloat(document.getElementById('rayon-sphere-fictive').value);

var Z=[];
var positions= [];
snp=[];
var o1=null;


for (let o = 0; o <= group_data_cube_float.length-1; o++) {
    
    var output=false;

    if (group_data_cube_float[o].prevSpec=='Protégée') {
        continue; // Skip this iteration
    }

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


if (spec==='Protégée') {

    continue;
} 


var X_min = X0_1 - Longueur_bat_1 / 2 ; 
var X_max = X0_1 + Longueur_bat_1 / 2;
var Y_min = Y0_1 - Largeur_bat_1 / 2;
var Y_max = Y0_1 + Largeur_bat_1 / 2;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points

}   else if (group_data_cube_float[o].group_name==='group_sphere') {


var Rayon = group_data_cube_float[o].Rayon;
var group_name=group_data_cube_float[o].group_name;
var X0_1 = group_data_cube_float[o].x0_1;
var Y0_1 = group_data_cube_float[o].y0_1;
var Z0_1 = group_data_cube_float[o].z0_1;
var spec=group_data_cube_float[o].prevSpec;



if (spec==='Protégée') {

continue

}


var X_min =0.;// X0_1 - Rayon - Rayon_P_M; 
var X_max = Rayon;//X0_1 + Rayon + Rayon_P_M;
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


if (spec==='Protégée') {

    continue
    
}


var X_min =0.;// X0_1 - Rayon - Rayon_P_M; 
var X_max = Rayon;//X0_1 + Rayon + Rayon_P_M;
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


if (Rayon_sup<=Rayon_inf) {

    Rayon_max=Rayon_inf;

} else {

    Rayon_max=Rayon_sup;

}

if (spec==='Protégée') {

continue

}



var X_min = 0;//X0_1 - Rayon_max - Rayon_p; 
var X_max = Rayon_max;//X0_1 + Rayon_max + Rayon_p;
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


if (spec==='Protégée') {

continue

}

var X_min = X0_1 - Longueur_bat_1; 
var X_max = X0_1 + Longueur_bat_1;
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



if (spec==='Protégée') {

continue

}

var X_min = 0;//X0_1 - Rayon_max - Rayon_p; 
var X_max = Rayon;//X0_1 + Rayon_max + Rayon_p;
var Y_min = 0.;//Y0_1 - Rayon_max - Rayon_p;
var Y_max = 2*Math.PI;//Y0_1 + Rayon_max + Rayon_p;
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



if (spec==='Protégée') {

continue

}

var X_min = X0_1 - Longueur_bat_1/2; 
var X_max = X0_1 + Longueur_bat_1/2;
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


if (spec==='Protégée') {

continue

}

var X_min = X0_1 - Longueur_bat_1/2 ; 
var X_max = X0_1 + Longueur_bat_1/2 ;
var Y_min = Y0_1 - Largeur_bat_1/2 ;
var Y_max = Y0_1 + Largeur_bat_1/2 ;
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

if (spec==='Protégée') {

continue

}

var X_min = X0_C; 
var X_max = X0_C + Longueur_C;
var Y_min = Y0_C;
var Y_max = Y0_C ;
var Deltax = (X_max - X_min) / Nombre_points
var Deltay = (Y_max - Y_min) / Nombre_points


}//// ADD STRUCTURES 


/////////////////////////////////////////boucle////////////////////////////
for (var i=0;i<Nombre_points+1;i++) {
    var X=X_min+i*Deltax

for (var j=0;j<Nombre_points+1;j++){
    var Y=Y_min+j*Deltay

    var Z4 = 0.;


    if (group_data_cube_float[o].group_name==='group_cube') {

        var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1;
        var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1;
        Hauteur_pour_PDA=Hauteur_bat_1;
 

    } else if (group_data_cube_float[o].group_name==='group_sphere') {
        //var X1=X*Math.cos(Y)+X0_1;
        //var Y1=X*Math.sin(Y)+Y0_1;

        const theta = (2 * Math.PI * i) / Nombre_points; // Angle azimutal de 0 à 2π
        const phi = (Math.PI * j) / (Nombre_points - 1); // Angle polaire de 0 à π
        // Coordonnées cartésiennes
        var X1 = Rayon * Math.sin(phi) * Math.cos(theta)+X0_1;
        var Y1 = Rayon * Math.sin(phi) * Math.sin(theta)+Y0_1;


        var r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

        if (r<=Rayon) {

            Hauteur_pour_PDA=Z0_1 + (Rayon) * Math.sin(Math.acos(r / (Rayon)));

        } else {

            Hauteur_pour_PDA=0.;
        }


    } else if (group_data_cube_float[o].group_name==='group_cylinder_sp') {
        //var X1=X*Math.cos(Y)+X0_1;
        //var Y1=X*Math.sin(Y)+Y0_1;

        const theta = (2 * Math.PI * i) / Nombre_points; // Angle azimutal de 0 à 2π
        const phi = (Math.PI * j) / (Nombre_points - 1); // Angle polaire de 0 à π
        // Coordonnées cartésiennes
        var X1 = Rayon * Math.sin(phi) * Math.cos(theta)+X0_1;
        var Y1 = Rayon * Math.sin(phi) * Math.sin(theta)+Y0_1;

        Hauteur_pour_PDA = Z2_CY_SP(X1, Y1, X0_1, Y0_1, Z0_1, Hauteur_bat_1, Rayon)


    } else if (group_data_cube_float[o].group_name==='group_cylinder') {
        var X1=X*Math.cos(Y)+X0_1;
        var Y1=X*Math.sin(Y)+Y0_1;

        Hauteur_pour_PDA=Z2_CY(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon_sup,group_data_cube_float[o].Rayon_inf,Rayon_p); 


    } else if (group_data_cube_float[o].group_name==='group_cylinderh') {
        
        //var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1;
        //var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1;

        var X1=(X-X0_1)*Math.cos(alpha)-((group_data_cube_float[o].Rayon)*Math.cos(Y))*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+((group_data_cube_float[o].Rayon)*Math.cos(Y))*Math.cos(alpha)+Y0_1

        Hauteur_pour_PDA=Z2_CYH (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1,group_data_cube_float[o].z0_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Rayon,-group_data_cube_float[o].alpha,Rayon_p);

                               

    } else if (group_data_cube_float[o].group_name==='group_cone') {
        var X1=X*Math.cos(Y)+X0_1;
        var Y1=X*Math.sin(Y)+Y0_1;

        Hauteur_pour_PDA=Z2_CONE(X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].z0_1, group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].Rayon,Rayon_p); 


    } else if (group_data_cube_float[o].group_name==='group_cube_cy') {
        
        //var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
        //var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1

        var X1=(X-X0_1)*Math.cos(alpha)-((group_data_cube_float[o].Largeur_bat_1/2)*Math.cos(Y))*Math.sin(alpha)+X0_1
        var Y1=(X-X0_1)*Math.sin(alpha)+((group_data_cube_float[o].Largeur_bat_1/2)*Math.cos(Y))*Math.cos(alpha)+Y0_1

        Hauteur_pour_PDA=Z2_CUBE_CY (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Largeur_bat_1,group_data_cube_float[o].Hauteur_bat_1,-group_data_cube_float[o].alpha,Rayon_p);
 

    } else if (group_data_cube_float[o].group_name==='group_cube_f') {
        
        var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1;
        var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1;

        Hauteur_pour_PDA=Z2_CUBE_F (X1, Y1, group_data_cube_float[o].x0_1, group_data_cube_float[o].y0_1,group_data_cube_float[o].yf_1, group_data_cube_float[o].Longueur_bat_1,group_data_cube_float[o].Largeur_bat_1,group_data_cube_float[o].Hauteur_bat_1,group_data_cube_float[o].HauteurMax_bat_1,-group_data_cube_float[o].alpha,Rayon_p);
       
    } else if (group_data_cube_float[o].group_name==='group_ca') {
        
        var X1=(X-X0_C)*Math.cos(alpha_C)-(Y-Y0_C)*Math.sin(alpha_C)+X0_C
        var Y1=(X-X0_C)*Math.sin(alpha_C)+(Y-Y0_C)*Math.cos(alpha_C)+Y0_C

        Hauteur_pour_PDA=Z2_CA (X1, Y1, group_data_cube_float[o].X0_C, group_data_cube_float[o].Y0_C,group_data_cube_float[o].Z0_C,group_data_cube_float[o].Longueur_C, group_data_cube_float[o].Hauteur_C_1,group_data_cube_float[o].Hauteur_C_2,group_data_cube_float[o].Sag_C,-group_data_cube_float[o].alpha_C,Deltay,Rayon_p);
               

    } 
    

    let output= false;
    
    
    ////ADD STRUCTURES 

    for (let k = 0; k <= group_data_cube_float.length-1; k++) {

        

        if (group_data_cube_float[k].group_name!=='group_pda') {

          //  continue;

        }

        if (group_data_cube_float[k].prevSpec=='Ignorée') {

            continue;

        }

     
        if (group_data_cube_float[k].group_name==='group_cube') {


    
                output1=Z2_R(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].Longueur_bat_1, group_data_cube_float[k].Largeur_bat_1, group_data_cube_float[k].Hauteur_bat_1,-group_data_cube_float[k].alpha,Rayon_p);              



                Z[k]=output1.Z2_RR0;
                //console.log('grop',Z[k])
                
    
        } else if (group_data_cube_float[k].group_name==='group_sphere') {
    
                output1=Z2_SP(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Rayon,Rayon_p); 
                Z[k]=output1.Z2_SPP;
    
        } else if (group_data_cube_float[k].group_name==='group_cylinder_sp') {
    
                Z[k]=Z2_CY_SP(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Hauteur_bat_1, group_data_cube_float[k].Rayon,Rayon_p); 

    
        } else if (group_data_cube_float[k].group_name==='group_cylinder') {
    
                Z[k]=Z2_CY(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Hauteur_bat_1, group_data_cube_float[k].Rayon_sup,group_data_cube_float[k].Rayon_inf,Rayon_p); 

        } else if (group_data_cube_float[k].group_name==='group_cylinderh') {
    
                Z[k]=Z2_CYH (X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].z0_1, group_data_cube_float[k].Longueur_bat_1, group_data_cube_float[k].Rayon, -group_data_cube_float[k].alpha,Rayon_p); 
                
    
        } else if (group_data_cube_float[k].group_name==='group_cone') {
    
                Z[k]=Z2_CONE(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].z0_1, group_data_cube_float[k].Hauteur_bat_1, group_data_cube_float[k].Rayon,Rayon_p); 
                
    
        } else if (group_data_cube_float[k].group_name==='group_cube_cy') {
    
                Z[k]=Z2_CUBE_CY (X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1, group_data_cube_float[k].Longueur_bat_1, group_data_cube_float[k].Largeur_bat_1, group_data_cube_float[k].Hauteur_bat_1, -group_data_cube_float[k].alpha,Rayon_p); 
                
    
        } else if (group_data_cube_float[k].group_name==='group_cube_f') {
    
                Z[k]=Z2_CUBE_F (X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].yf_1, group_data_cube_float[k].Longueur_bat_1,group_data_cube_float[k].Largeur_bat_1,group_data_cube_float[k].Hauteur_bat_1,group_data_cube_float[k].HauteurMax_bat_1,-group_data_cube_float[k].alpha,Rayon_p);
 
    
        } else if (group_data_cube_float[k].group_name==='group_ca') {
    
                Z[k]=Z2_CA (X1, Y1, group_data_cube_float[k].X0_C, group_data_cube_float[k].Y0_C,group_data_cube_float[k].Z0_C,group_data_cube_float[k].Longueur_C, group_data_cube_float[k].Hauteur_C_1,group_data_cube_float[k].Hauteur_C_2,group_data_cube_float[k].Sag_C,-group_data_cube_float[k].alpha_C,Deltay,Rayon_p,group_data_cube_float);
    
        } 
    
    
            if (Z[k]>=Z4) {
                Z4=Z[k];
    
            }



                       
           // output=Z2_PDA(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].z0_1,group_data_cube_float[k].Hauteur_bat_1,Hauteur_pour_PDA,k,Z[o],o,Rayon_p,group_data_cube_float);





        //if (output==true && (Hauteur_pour_PDA < Z4)) {
         //   break;

        //}

        //console.log(Hauteur_pour_PDA)

    }


    
    for (let k = 0; k <= group_data_cube_float.length-1; k++) {

        

        if (group_data_cube_float[k].group_name!=='group_pda') {

            continue;

        }

        if (group_data_cube_float[k].prevSpec=='Ignorée') {

            continue;

        }

     
                        
        output=Z2_PDA(X1, Y1, group_data_cube_float[k].x0_1, group_data_cube_float[k].y0_1,group_data_cube_float[k].z0_1,group_data_cube_float[k].Hauteur_bat_1,Hauteur_pour_PDA,k,Z[o],o,Rayon_p,group_data_cube_float);





        if (output==true) {
            break;

        }

        //console.log(Hauteur_pour_PDA)

    }
    

        if (output===false){

            //console.log(Hauteur_pour_PDA , Z4)

            if (Hauteur_pour_PDA < Z4) {

                continue

            }

            //console.log(Hauteur_pour_PDA,Z4)

           if (group_data_cube_float[o].group_name==='group_cube') {

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }


            var X1=(X-X0_1)*Math.cos(alpha)-(Y-Y0_1)*Math.sin(alpha)+X0_1
            var Y1=(X-X0_1)*Math.sin(alpha)+(Y-Y0_1)*Math.cos(alpha)+Y0_1

                   
            positions.push(X1,Hauteur_bat_1+0.05,Y1);
                       
 


    } else if (group_data_cube_float[o].group_name==='group_sphere') {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));


        if (r<=Rayon) {
        

            X_S=X1;
            Z_S=Rayon* Math.sin(Math.acos(r / (Rayon)))+Z0_1;
            Y_S=Y1;



            positions.push(X_S,Z_S,Y_S);
            

        } 

        
        


    } else if (group_data_cube_float[o].group_name==='group_cylinder_sp') {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }




           r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));


        if (r<=Rayon) {
        

            X_S=X1;
            Z_S=Rayon* Math.sin(Math.acos(r / (Rayon)))+Hauteur_bat_1;
            Y_S=Y1;


            positions.push(X_S,Z_S,Y_S);
            

        } 
        


    } else if (group_data_cube_float[o].group_name==='group_cylinder') {
        

        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));

        if (Rayon_sup===Rayon_inf) {

            alpha=Math.PI/2;

        } else {

            alpha=Math.atan((Hauteur_bat_1-Z0_1)/Math.abs(Rayon_sup-Rayon_inf));

        }

    if (Rayon_sup>=Rayon_inf) {

        if (r>=0 && r<=Rayon_sup) {

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }






            X_CY=X1;//Rayon*((X1-X0_1)/ (Rayon_p+Rayon))+X0_1;
            Z_CY=Hauteur_bat_1+0.05;
            Y_CY=Y1;//Rayon*((Y1-Y0_1)/(Rayon_p+Rayon))+Y0_1;


            positions.push(X_CY,Z_CY,Y_CY);
        
        
      

        }    


    } else {



    if (r>=0 && r<=Rayon_sup) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        X_CY=X1;
        Z_CY=Hauteur_bat_1+0.05;
        Y_CY=Y1;

        positions.push(X_CY,Z_CY,Y_CY);
      
        

    } else if (r>Rayon_sup && r<=Rayon_inf) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }

        Zi=(r-Rayon_sup)/Math.cos(alpha);

        Zf=Zi*Math.sin(alpha);

        X_CY=X1;
        Z_CY=Hauteur_bat_1-Zf+0.05;
        Y_CY=Y1;


        positions.push(X_CY,Z_CY,Y_CY);
        
        

        

    } 

    }


    ////////

} else if (group_data_cube_float[o].group_name==='group_cylinderh') {




XO = X0_1 - Longueur_bat_1 / 2;
XE = X0_1 + Longueur_bat_1 / 2;
YN = Y0_1+ Rayon;
YS = Y0_1 - Rayon;

if (X >= XO && X<=XE && Y >= YS && Y <=YN) {

    if (o!==o1) {

        snp.push(group_data_cube[o].text_new_item);
        o1=o;
    }

    //X_CY=X1;
    //Z_CY=Z0_1+(Rayon)*Math.sin(Math.acos(Math.abs(Y-Y0_1)/(Rayon)))+0.05;
    //Y_CY=Y1;

    X_CY=(X-X0_1)*Math.cos(alpha)-((Rayon)*(((Rayon)*Math.cos(Y))/(Rayon)))*Math.sin(alpha)+X0_1;
    Z_CY=Z0_1+(Rayon)*Math.sin(Math.acos(Math.abs((Rayon)*Math.cos(Y))/(Rayon)))+0.05;
    Y_CY=(X-X0_1)*Math.sin(alpha)+((Rayon)*(((Rayon)*Math.cos(Y))/(Rayon)))*Math.cos(alpha)+Y0_1;

    positions.push(X_CY,Z_CY,Y_CY);


} 




    } else if (group_data_cube_float[o].group_name==='group_cone') {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
        }



        r = Math.sqrt(Math.pow(X1 - X0_1,2) + Math.pow(Y1 - Y0_1,2));


        alpha=Math.atan((Hauteur_bat_1-Z0_1)/Rayon);



       if (r>=0 && r<=Rayon) {

            Zi=r/Math.cos(alpha);


            

            Zf=Zi*Math.sin(alpha);

            X_CY=X1;
            Z_CY=Hauteur_bat_1-Zf+0.05;
            Y_CY=Y1;




            positions.push(X_CY,Z_CY,Y_CY);


       }





    } else if (group_data_cube_float[o].group_name==='group_cube_cy') {




        XO = X0_1 - Longueur_bat_1 / 2;
        XE = X0_1 + Longueur_bat_1 / 2;
        YN = Y0_1 + Largeur_bat_1 / 2;
        YS = Y0_1 - Largeur_bat_1 / 2;
        Y_Y0=(Largeur_bat_1 / 2)*Math.cos(Y);

        if (X >= XO && X<=XE && Y >= YS && Y <=YN) {

            if (o!==o1) {

                snp.push(group_data_cube[o].text_new_item);
                o1=o;
            }


            //X_CY=X1;
            //Z_CY=Hauteur_bat_1+(Largeur_bat_1/2)*Math.sin(Math.acos(Math.abs(Y-Y0_1)/(Largeur_bat_1/2)))+0.05;
            //Y_CY=Y1;

            X_CY=(X-X0_1)*Math.cos(alpha)-((Largeur_bat_1/2)*((Y_Y0)/(Largeur_bat_1/2)))*Math.sin(alpha)+X0_1;
            Z_CY=Hauteur_bat_1+(Largeur_bat_1/2)*Math.sin(Math.acos(Math.abs(Y_Y0)/(Largeur_bat_1/2)))+0.05;
            Y_CY=(X-X0_1)*Math.sin(alpha)+((Largeur_bat_1/2)*((Y_Y0)/(Largeur_bat_1/2)))*Math.cos(alpha)+Y0_1;
            
            positions.push(X_CY,Z_CY,Y_CY);
                 
        

    
        } 




} else if (group_data_cube_float[o].group_name==='group_cube_f') {


    var Z2_CUBE_FF0=0.;

    alpha_F_1=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2-YF_1));
    alpha_F_2=Math.atan((HauteurMAX_bat_1-Hauteur_bat_1)/(Largeur_bat_1/2+YF_1));
    
    YFF_1=YF_1+Y0_1;
    

    if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y >=YFF_1 && Y <=Y0_1+Largeur_bat_1/2) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;

        }

        Zi=(Y-YFF_1)/Math.cos(alpha_F_1);

        X_CY=X1;
        Z_CY=HauteurMAX_bat_1-Zi*Math.sin(alpha_F_1)+0.05;
        Y_CY=Y1;
               
        positions.push(X_CY,Z_CY,Y_CY);


    } else if (X>=X0_1-Longueur_bat_1/2 && X<=X0_1+Longueur_bat_1/2  && Y <=YFF_1 && Y >=Y0_1-Largeur_bat_1/2) {

        if (o!==o1) {

            snp.push(group_data_cube[o].text_new_item);
            o1=o;
            
        }

        Zi=(YFF_1-Y)/Math.cos(alpha_F_2);

        X_CY=X1;
        Z_CY=HauteurMAX_bat_1-Zi*Math.sin(alpha_F_2)+0.05;
        Y_CY=Y1;
               
        positions.push(X_CY,Z_CY,Y_CY);


    } 
        

} else if (group_data_cube_float[o].group_name==='group_ca') {

    if (o!==o1) {

        snp.push(group_data_cube[o].text_new_item);
        o1=o;

    }


    X_CA=X1;
    Z_CA=Hauteur_pour_PDA+0.05;
    Y_CA=Y1;
    

    positions.push(X_CA,Z_CA,Y_CA);

    

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

