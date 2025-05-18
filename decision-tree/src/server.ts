import express from 'express';
import bodyParser from 'body-parser';
import { ActionFactory } from './factories/ActionFactory';
import { Action } from './actions/Action';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/process-tree', async (req, res) => {
  try {
    let currentAction: Action | undefined = ActionFactory.fromJSON(req.body);
		while (currentAction) {
			await currentAction.execute({
				date: new Date().toLocaleDateString('en-GB')
			});
			currentAction = currentAction.next;
		}

    res.status(200).send({
			success: true
		});
  } catch (err: any) {
    console.error(err);
    res.status(400).send(`Error: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});