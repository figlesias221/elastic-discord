import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ZipList({ zips }) {
  return (
    zips.length > 0 && (
      <TableContainer component={Paper} style={{ maxWidth: 1200, marginBottom:"3rem"}}>
        <Table sx={{ minWidth: 650, border: 1, borderColor: 'grey.500', borderStyle: 'solid', borderRadius: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Channel</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Mentions</TableCell>
              <TableCell align="right">Has Link</TableCell>
              <TableCell align="right">Has Video</TableCell>
              <TableCell align="right">Has Audio</TableCell>
              <TableCell align="right">Is Pinned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zips.map((zip) => (
              <TableRow
                key={zip.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {zip.text}
                </TableCell>
                <TableCell align="right">{zip.date}</TableCell>
                <TableCell align="right">{zip.channel}</TableCell>
                <TableCell align="right">{zip.user}</TableCell>
                <TableCell align="right">{zip.mentions || 0}</TableCell>
                <TableCell align="right">{zip.hasLink ? "Yes" : "No"}</TableCell>
                <TableCell align="right">{zip.hasVideo ? "Yes" : "No"}</TableCell>
                <TableCell align="right">{zip.hasAudio ? "Yes" : "No"}</TableCell>
                <TableCell align="right">
                  {zip.isPinned ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
