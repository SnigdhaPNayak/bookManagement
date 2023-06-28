export class Book{

    private bookID!:number
    private bookName!:String
    private selected!:boolean

        public constructor(init?: Partial<{bookID: string | null ;bookName: string | null;selected: boolean | null}>) {
            Object.assign(this, init);
        }

        getBookId(){
            return this.bookID
        }
        getBookName(){
            return this.bookName
        }
            
}