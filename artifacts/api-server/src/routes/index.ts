import { Router, type IRouter } from "express";
import healthRouter from "./health";
import languagesRouter from "./languages";
import coursesRouter from "./courses";
import lessonsRouter from "./lessons";
import progressRouter from "./progress";
import quizRouter from "./quiz";
import codeRouter from "./code";
import leaderboardRouter from "./leaderboard";
import adminRouter from "./admin";
import studyGroupsRouter, { usersRouter } from "./studyGroups";
import storageRouter from "./storage";
import walletRouter from "./wallet";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/languages", languagesRouter);
router.use("/courses", coursesRouter);
router.use("/lessons", lessonsRouter);
router.use("/progress", progressRouter);
router.use("/quiz", quizRouter);
router.use("/code", codeRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/admin", adminRouter);
router.use("/study-groups", studyGroupsRouter);
router.use("/users", usersRouter);
router.use("/wallet", walletRouter);
router.use(storageRouter);

export default router;
