import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    try {
      const user = this.showUserProfileUseCase.execute({ user_id });

      if (user) {
        return response.status(200).json(user);
      }
    } catch (err) {
      response.status(404).json({ error: err.message });
    }

    return response.status(404);
  }
}

export { ShowUserProfileController };
