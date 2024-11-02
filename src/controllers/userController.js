import userService from "../services/userService";
import { body, validationResult, param } from "express-validator";

const userController = {
   create: [
    body("name")
      .notEmpty()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter pelo menos 3 caracteres"),
    body("email")
      .notEmpty()
      .withMessage("O email é obrigatório")
      .isEmail()
      .withMessage("Email inválido"),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres"),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  getAll: [
    async (req, res) => {
      try {
        const users = await userService.getAllUsers(req.user.id);
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  
  getById: [
    
    param("id").isUUID().withMessage("ID de usuário inválido"),

    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
  ],


  update: [

    param("id").isUUID().withMessage("ID de usuário inválido"),
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome deve ter pelo menos 3 caracteres"),
    body("email").optional().isEmail().withMessage("Email inválido"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres"),

    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const updatedUser = await userService.updateUser(
          req.params.id,
          req.body,
          req.user.id
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  
  delete: [
    
    param("id").isUUID().withMessage("ID de usuário inválido"),

    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        await userService.deleteUser(req.params.id, req.user.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],
};

export default userController;
