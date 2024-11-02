/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Endpoints associated to User model
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
 *     description: This endpoint creates a new user and returns the user object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *       XXX:
 *         description: API Errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
