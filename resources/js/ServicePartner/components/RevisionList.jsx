import React from "react";
import FormatText from "./FormatText";

export default function RevisionList(data) {
    return data?.data?.length > 0
        ? data?.data.map((value, index) => {
              const date = new Date(value.created_at);
              const formattedDate = date.toLocaleString("en-IN");
              return (
                  <div
                      key={index}
                      style={{ border: "1px solid #ccc" }}
                  >
                      <ul uk-accordion="true">
                          <li>
                              <a className="uk-accordion-title uk-padding-small">
                                  <b>Date: {formattedDate}</b>
                              </a>
                              <div className="uk-accordion-content uk-padding-small">
                                  <div className="uk-flex gap-6">
                                      <div className="uk-width-1-2">
                                          <b>New Data</b>
                                          <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                              <tbody>
                                                  <tr>
                                                      <td className="uk-width-1-4">
                                                          Name
                                                      </td>
                                                      <td>
                                                          {value.new_data?.name}
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>Slug</td>
                                                      <td>
                                                          {value.new_data?.slug}
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>Description</td>
                                                      <td>
                                                          {
                                                              value.new_data
                                                                  ?.description
                                                          }
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>Revised By</td>
                                                      <td>
                                                          {
                                                              value.revised_user
                                                                  ?.name
                                                          }
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>

                                      <div className="uk-width-1-2">
                                          <b>Old Data</b>
                                          <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                              <tbody>
                                                  <tr>
                                                      <td className="uk-width-1-4">
                                                          Name
                                                      </td>
                                                      <td>
                                                          {value.old_data?.name}
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>Slug</td>
                                                      <td>
                                                          {value.old_data?.slug}
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>Description</td>
                                                      <td>
                                                          {
                                                              value.old_data
                                                                  ?.description
                                                          }
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>Revised By</td>
                                                      <td>
                                                          {
                                                              value.revised_user
                                                                  ?.name
                                                          }
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>

                                  <div>
                                      <b>Reviews</b>
                                  </div>
                                  <div className="uk-flex gap-6">
                                      {value?.reviews?.map((val, i) => {
                                          const date = new Date(val.created_at);
                                          const fdate =
                                              date.toLocaleString("en-IN");
                                          return (
                                              <div className="uk-card uk-card-default uk-card-body uk-width-1-4@m" key={i}>
                                                  <p className="uk-text-small uk-remove-padding">
                                                      Date {fdate}
                                                  </p>
                                                  <div>
                                                      Comment:{" "}
                                                      {val.review_comment}
                                                  </div>
                                                  <p className="uk-text-small">
                                                      Status:{" "}
                                                      <FormatText
                                                          text={
                                                              val.review_status
                                                          }
                                                      />
                                                  </p>
                                              </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
              );
          })
        : "Data Not Found";
}
