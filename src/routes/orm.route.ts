import express, { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";

import { User } from "../entity/User";
import { Profile } from "../entity/Profile";
import { AppDataSource } from "../data-source";
const userRepo = AppDataSource.getRepository(User);
const profileRepo = AppDataSource.getRepository(Profile);

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("orm");
});

router.get("/users", (req: Request, res: Response) => {
  // userRepo.find() /* get fom single table*/

  // find with relation
  userRepo
    .find({
      relations: {
        profile: true,
      },
    })
    .then((allRecords) => res.json(allRecords))
    .catch((err: any) => {
      console.log(err);
    });
});

router.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  userRepo
    .findOne({
      where: {
        id: id as unknown as number,
      },
      relations: {
        profile: true,
      },
    })
    .then((allRecords) => res.json(allRecords))
    .catch((err: any) => {
      console.log(err);
    });
});

router.post("/users", (req: Request, res: Response) => {
  const { firstName, lastName, age, gender, photo } = req.body;

  const profile: Profile = new Profile();
  profile.gender = gender;
  profile.photo = photo;

  // insert user
  const user: User = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.age = age;
  user.isActive = true;
  user.profile = profile;

  userRepo
    .save(user)
    .then((saved) => {
      res.json(saved);
    })
    .catch((err: any) => {
      console.log(err);
      res.send("insert error");
    });
});

router.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  // for singlr table
  // userRepo.update(id, { firstName, lastName, age })

  // for relation
  userRepo
    .update(id, { firstName, lastName, age })
    .then((response) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
      res.send("update error");
    });
});

router.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  userRepo
    .delete(id)
    .then((_) => res.json("deleted"))
    .catch((err: any) => {
      console.log(err);
      res.send("error deleting");
    });
});

router.delete("/profile/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  profileRepo
    .delete(id)
    .then((_) => res.json("deleted"))
    .catch((err: any) => {
      console.log(err);
      res.send("error deleting");
    });
});


// express-validator
router.post(
  "/validate",
  [
    check("email", "Email invalid").isEmail(),
    check("email", "Email length should be 10 to 30 characters").isLength({ min: 10, max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({ min: 10, max: 20 }),
    check("mobile", "Mobile number should contains 10 digits").isLength({ min: 10, max: 10 }),
    check("password", "Password length should be 8 to 10 characters").isLength({ min: 8, max: 10 }),
  ],
  (req: Request, res: Response) => {
    const { email, name, mobile, password } = req.body;

    // validationResult function checks whether
    // any occurs or not and return an object
    const errors = validationResult(req);

    // If some error occurs, then this
    if (!errors.isEmpty()) {
      res.json(errors);
    }

    // If no error occurs, then this
    else {
      res.json({ email, name, mobile, password });
    }
  }
);

// module.exports = router;
export default router;
