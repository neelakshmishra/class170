AFRAME.registerComponent("create-markers", {
  init: async function(){
    var dishes = this.getDishes();
    var mainScene = document.querySelector("#main-scene");
    

    dishes.map((dish)=>{
      //create a marker
      var marker = document.createElement("a-marker");
      marker.setAttribute("id",dish.id);
      marker.setAttribute("type","pattern");
      marker.setAttribute("url",dish.marker_pattern_url);
      marker.setAttribute("cursor",{rayOrifin:'mouse'});
      marker.setAttribute("markerhandler",{});
      mainScene.appendChild(marker);
      
      //add the 3D model to the scene
      var model = document.createElement("a-entity");
      model.setAttribute("id",`model-${dish.id}`);
      model.setAttribute("position",dish.model_geometry.position);
      model.setAttribute("rotation",dish.model_geometry.rotation);
      model.setAttribute("scale",dish.model_geometry.scale);
      model.setAttribute("gltf-model",`url(${dish.model_url})`);
      model.setAttribute("gesture-handler",{});
      marker.appendChild(model)
            
      //Ingredients container
      var mainPlane = document.createElement("a-plane");
      mainPlane.setAttribute("id",`model-plane-${dish.id}`);
      mainPlane.setAttribute("position",{ x: 0, y: 0, z: 0 });
      mainPlane.setAttribute("rotation",{ x: -90, y: 0, z: 0 });
      mainPlane.setAttribute("width",1.7);
      mainPlane.setAttribute("height",1.5);
      marker.appendChild(mainPlane);

      //dish title background
      var titlePlane = document.createElement("a-plane");
      titlePlane.setAttribute("id",`title-plane-${dish.id}`);
      titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
      titlePlane.setAttribute("rotation",{ x: 0, y: 0, z: 0 });
      titlePlane.setAttribute("width",1.7);
      titlePlane.setAttribute("height",0.3);
      titlePlane.setAttribute("material",{color:"cyan"});
      mainPlane.appendChild(titlePlane);

      //Dish title
      var dishTitle = document.createElement("a-entity");
      dishTitle.setAttribute("id",`dish-title-${dish.id}`);
      dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
      dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      dishTitle.setAttribute("text",{
        font: "monoid",
        color: "black",
        width: 1.8,
        height: 1,
        align: "center",
        value:dish.dish_name.toUpperCase()
      });
      titlePlane.appendChild(dishTitle)

      //Ingredients List
      var ingredients = document.createElement("a-entity");
      ingredients.setAttribute("id",`ingredients-${dish.id}`);
      ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
      ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      ingredients.setAttribute("text",{
        font: "monoid",
        color: "black",
        width: 2,
        align: "left",
        value:`${dish.ingredients.join("\n\n")}`
      });
      mainPlane.appendChild(ingredients)
      
    })
  },
  getDishes: async function(){
    return await firebase
    .firestore()
    .collection('dishes')
    .get()
    .then((items)=>{
      return items.docs.map((doc)=>{
         doc.data();
      })
    })
  },
});
