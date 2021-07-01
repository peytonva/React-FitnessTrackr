import { useEffect, useState } from "react";
import { getActivities } from "../api";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import CreateActivity from "./createactivity";

const Activities = () => {
const [activities, setActivities] = useState();

useEffect(() => {
    getActivities(activities).then((data) => {
    if (data.length) {
    setActivities(data);
    }
});
}, [activities]);

return (
    <>
      <CreateActivity />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='right'>ID</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities &&
              activities.map((activity) => {
                return (
                  <TableRow key={activity.name}>
                    <TableCell component='th' scope='row'>
                      {activity.id}
                    </TableCell>
                    <TableCell align='right'>{activity.name}</TableCell>
                    <TableCell align='right'>{activity.description}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Activities;