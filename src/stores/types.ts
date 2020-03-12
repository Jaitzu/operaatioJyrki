//types for all the variables
export interface IOperationStore {
    lopetusIka: any;
    aloitusIka: any;
    turvaProsentti:any;
    saastot:any;
    elakkeet:any[];
    elakeAika:any;

    checkSessionStore(): any;
    setData(data:any):any
    vuodenEläke(index:any):any
    updateData(lopetusIka:any):any
}
