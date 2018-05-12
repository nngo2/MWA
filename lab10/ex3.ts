abstract class Shape {
    public width: number; 
    public height: number;
    abstract calcSize() : number;
}

class Rectangle extends Shape {
    calcSize() {
        return this.width * this.height;
    }
}

let rect = new Rectangle();
rect.width = 5;
rect.height = 2;

console.log(rect.calcSize());