import logo from './logo.svg';
import styled from "styled-components";
import Axios from "axios";
import './App.css';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React,{useState} from "react";
import {RecipeListContainer,RecipeContainer,CoverImage,IngredientsText,SeeMoreText,RecipeName} from './components/RecipeComponent'
import {Header,AppNameComponent,AppIcon,SearchComponent,SearchInput,SearchIcon} from './components/headerComponent'
const APP_ID="d6797407";
const APP_KEY="cd3a303e9108670ad4961c45f002dce6";
const Container=styled.div`
  display:flex;
  flex-direction: column;
  
`;
const Placeholder=styled.img`
width:120px;
height:120px;
margin:200px;
opacity:50%;
`;

const RecipeComponent=(props)=>{
  const [show, setShow] = React.useState(false);
  const {recipeObj}=props;
  return(
    <>
    <Dialog open={show}>
    <DialogTitle id="alert-dialog-title">
        Ingredients
    </DialogTitle>
    <DialogContent>
      <table>
        <thead>
          <th>Ingredients</th>
          <th>Weight</th>
        </thead>
        <tbody>
          {recipeObj.ingredients.map((ingredientObj)=>
          <tr>
            <td>{ingredientObj.text}</td>
            <td>{ingredientObj.weight}</td>
          </tr>)}
          
        </tbody>
      </table>
    </DialogContent>  
    <DialogActions>
          <IngredientsText onClick={()=>window.open(recipeObj.url)}>See More</IngredientsText>
          <SeeMoreText onClick={()=>setShow("")}>Close</SeeMoreText>
          
        </DialogActions>
      
    </Dialog>
    <RecipeContainer>
      <CoverImage src={recipeObj.image} />
      <RecipeName>{recipeObj.label}</RecipeName>
      <IngredientsText onClick={()=>setShow(true)}>Ingredients</IngredientsText>
      <SeeMoreText onClick={()=>window.open(recipeObj.url)}>See Complete Recipe</SeeMoreText>
    </RecipeContainer>
    </>
  );
};

function App() {
    const [timeOutId,updateTimeoutId]=useState();
    const [recipeList,updateRecipeList]=useState([]);
    const fetchRecipe=async (searchString)=>{
      const response = await Axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      );
      updateRecipeList(response.data.hits);
    };
    const onTextChange=(event)=>{
      clearTimeout(timeOutId);
      const timeout=setTimeout(()=>fetchRecipe(event.target.value),500);
      updateTimeoutId(timeout);
    };
  return (
    <Container>
      <Header><AppNameComponent><AppIcon src='hamburger.svg'/>Recipe Finder</AppNameComponent>
      <SearchComponent>
      <SearchIcon src="/search-icon.svg"/>
        <SearchInput placeholder="Search Recipe" onChange={onTextChange}/>
      </SearchComponent>
      </Header>
      <RecipeListContainer>
        {recipeList.length ?
        recipeList.map((recipeObj) => (<RecipeComponent recipeObj={recipeObj.recipe} />
        )):<Placeholder src="hamburger.svg"/>}
        
      </RecipeListContainer>
    </Container>
    
  );
}

export default App;
