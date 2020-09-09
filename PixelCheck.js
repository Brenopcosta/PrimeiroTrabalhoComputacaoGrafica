var scene = [
    {  
        shape: "triangle",
        vertices: nj.array([ [50.,25.], [300., 100.], [200., 150.] ]),
        color: nj.array([0, 250, 0])    
    }
]


function checkPointInBoundingBox( x , y, primitive ){
    var minimumX = primitive.vertices.get(0,0);

    primitive.vertices.forEach((point) => {
        if ( point[0] < minimumX ) {
            minimumX = point[0];
        }
    }); 

    var maximunX = primitive.vertices[0][0];
    
    primitive.vertices.forEach((point) => {
        if ( point[0] > maximunX ) {
            maximunX = point[0];
        }
    });

    var maximunY = primitive.vertices[0][1];

    primitive.vertices.forEach((point) => {
        if ( point[1] > maximunY ) {
            maximunY = point[1];
        }
    });

    var minimumY =  primitive.vertices[0][1];

    primitive.vertices.forEach((point) => {
        if ( point[1] < minimumY ) {
            minimumY = point[1];
        }
    });
    
    if ( x > minimumX && x < maximunX && y < maximunY && y > minimumY){
        return true;
    }
    else{
        return false;
    }
}



function createBoundingBox( primitive ){
    var vertices = primitive.vertices.tolist();

    var minimumX = vertices[0][0];

    vertices.forEach((point) => {
        if ( point[0] < minimumX ) {
            minimumX = point[0];
        }
    }); 

    var maximunX = vertices[0][0];
    
    vertices.forEach((point) => {
        if ( point[0] > maximunX ) {
            maximunX = point[0];
        }
    });

    var maximunY = vertices[0][1];

    vertices.forEach((point) => {
        if ( point[1] > maximunY ) {
            maximunY = point[1];
        }
    });

    var minimumY =  vertices[0][1];

    vertices.forEach((point) => {
        if ( point[1] < minimumY ) {
            minimumY = point[1];
        }
    });

    var boudingBox = {
        maximunX : maximunX,
        minimumX : minimumX,
        maximunY : maximunY,
        minimumY : minimumY
    }

    primitive.boudingBox = boudingBox;

    return primitive;
}

function checkPixelInBoundingBox(x,y,boudingBox){
    if ( x > boudingBox.minimumX && x < boudingBox.maximunX && y < boudingBox.maximunY && y > boudingBox.minimumY){
        return true;
    }
    return false;
}


function checkPixelInPolygon(x , y , primitive ){
    var vertices = primitive.vertices.tolist();

    var shapeVectors = [];

    vertices.forEach( (vertice, index) => {
        var vector = []
        if (index + 1 < vertices.length ){
            
            vector[0] = vertices[index + 1][0] - vertice[0];
            vector[1] = vertices[index + 1][1] - vertice[1];

            shapeVectors.push(vector);
        }
        else{    
            vector[0] = vertices[0][0] - vertice[0];
            vector[1] = vertices[0][1] - vertice[1];

            shapeVectors.push(vector);           
        }
    })

    var normalVectors = [];

    shapeVectors.forEach((vector) =>{
        normalVectors.push([ - vector[1] , vector[0] ]);
    })

    var dotVectors = [];

    vertices.forEach((vertice) => {
        dotVectors.push([ x - vertice[0] , y - vertice[1]])
    })

    dotVectors.forEach((dotVector,index) => {
        if ( (dotVector[0] * normalVectors[index][0] + dotVector[1] * normalVectors[index][1] ) < 0){
            console.log("ENTROU AQUI")
            return false;
        }
    })
    console.log("PINTA AQUI")
    
    return true;
}

function createCircleBoundingBox ( primitive ){
    primitive.boudingBox = {
        maximunX : primitive.center.get(0) + primitive.radius,
        minimumX : primitive.center.get(0) - primitive.radius,
        maximunY : primitive.center.get(1) + primitive.radius,
        minimumY : primitive.center.get(1) - primitive.radius
    }
    
    return primitive;
}


function checkPixelInCircle(x ,y ,primitive ){
    
    if ((x - primitice.center.get(0))**2 + (y - primitice.center.get(1))**2 > primitive.radius**2){
        return false;
    }
    return true;
}