import {action, observable} from 'mobx';

export default class OperationStore {
    @observable public lopetusIka: any =null;
    @observable public aloitusIka: any =null;
    @observable public turvaProsentti:any =null;
    @observable public saastot:any=null;
    @observable public elakkeet:any=[]
    @observable public elakeAika:any=null;
    @observable public aloitusSumma:any=null;
    @observable public miinustettavaSumma:any=null;



    private rootStore: any;

    constructor(rootStore: any) {
        this.rootStore = rootStore;
    }

    //function for checking the sessionStore for data and updating the observable variables
    @action
    public checkSessionStore = () => {

    }
    @action setData=(data:any)=>{
        this.aloitusSumma =(data.saastot*this.turvaProsentti)/100;
        this.aloitusIka=data.aloitusIka;
        this.lopetusIka=data.lopetusIka;
        this.turvaProsentti=data.turvaProsentti;
        this.saastot=data.saastot
        this.elakeAika=data.lopetusIka - data.aloitusIka;

        console.log(this.lopetusIka)
        console.log(this.aloitusIka)
        console.log(this.turvaProsentti)
        console.log(this.saastot)
        this.elakkeet=[{ika:data.aloitusIka, elake:(data.saastot*this.turvaProsentti)/100,}]
        this.miinustettavaSumma = Math.floor(((data.saastot*this.turvaProsentti)/100) / (data.lopetusIka - data.aloitusIka));
        console.log(Math.floor(((data.saastot*this.turvaProsentti)/100) / (data.lopetusIka - data.aloitusIka)))
    }
    @action vuodenEläke =(index:any)=>{
        console.log(index)
        console.log(this.elakkeet)
        const elake = Number(this.elakkeet[index-1].ika) +1
        console.log(elake)
        console.log(this.elakeAika)

        const summa= Number(this.elakkeet[index-1].elake)-(Number(this.miinustettavaSumma))
        console.log(summa)
        if(summa < 10 ){
            this.elakkeet.push({ika:elake,elake:0})
        }else {
            this.elakkeet.push({ika: elake, elake: summa})
        }
    }
    @action paivitaElake =(value:any,index:any)=>{
        console.log(index)
        this.elakkeet[index].elake=value;
        console.log(this.elakkeet[index].elake)
        let arvo =index;
        this.elakkeet.map((target:any,index:any)=>{
            if(arvo<index){
                console.log("moi")
                this.elakkeet[index].elake=(Number(this.elakkeet[index-1].elake)-(Number(this.miinustettavaSumma)));
            }

        })
}
@action updateData=(lopetus:any)=>{
    this.miinustettavaSumma = Math.floor(((this.saastot*this.turvaProsentti)/100) / (lopetus- this.aloitusIka));
}

}