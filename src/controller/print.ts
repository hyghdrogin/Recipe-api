import { Request, Response } from "express";
import puppeteer from "puppeteer";
import config from "../config";
import models from "../models";
import {
  successResponse,
  errorResponse,
  handleError,
} from "../utilities/responses";

/**
 * @class ReciprintController
 * @description create, log in user
 * @exports ReciprintController
 */
export default class ReciprintController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async printRecipe(req: Request, res: Response) {
    try {
      const { recipeId } = req.params;
      const recipe = await models.Recipe.findById(recipeId);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      console.log(recipe);
      // await page.setContent(JSON.stringify(recipe));
      await page.setContent(
        `<h1>${recipe?.title}</h1><br>
        <p>${recipe?.subtitle}</p>

        <h2>Description</h2>
        <p>${recipe?.description}</p><br>
        <h2>Materials</h2>
        <p>${recipe?.materials}</p><br>
        <h2>Ingredients</h2>
        <p>${recipe?.ingredient}</p><br>
        <h2>Steps</h2>
        <p>${recipe?.steps}</p><br>
        <h2>Duration</h2>
        <p>${recipe?.duration}</p><br>
        <h2>Author</h2>
        <p>${recipe?.author}</p><br>
        `
      );
      const pdf = await page.pdf({
        path: "src/recipe.pdf",
        format: "A4",
        printBackground: true,
      });
      console.log(`Recipe card generated from ${config.APP_NAME}`);
      await browser.close();
      return successResponse(res, 201, "A4 fromat pdf generated", pdf);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
