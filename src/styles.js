import styled from "styled-components";

export const MainBox = styled.main`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  section {
    &:first-child {
      height: 25%;
      width: 100%;
      background-color: #0d0d0d;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        display: flex;
        align-items: center;
        gap: 1rem;
        h1 {
          font-weight: 900;
          font-size: 2.5em;
          color: #4ea8de;
          span {
            color: #5e60ce;
          }
        }
      }
    }
    &:last-child {
      min-height: 75%;
      width: 100%;
      background-color: #1a1a1a;
      position: relative;
      display: flex;
      justify-content: center;
      padding: 5rem 0 2rem 0;
      .add__task {
        width: 46rem;
        height: 3.3rem;
        position: absolute;
        top: -1.65rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input,
        button {
          height: 100%;
          border-radius: 0.5rem;
        }
        input {
          width: 80%;
          padding-left: 1rem;
          background-color: #262626;
          color: white;
          border: 1px solid #0d0d0d;
          ::placeholder {
            font-family: 400;
            color: #808080;
            font-size: 1em;
          }
        }
        button {
          cursor: pointer;
          width: 18%;
          background-color: #1e6f9f;
          font-size: 1em;
          color: white;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
        }
      }
      .tasks {
        width: 46rem;
        .task-infos {
          display: flex;
          justify-content: space-between;
          width: 100%;
          span {
            font-weight: 700;
          }
          .created {
            display: flex;
            align-items: center;
            gap: 1rem;
            .created-title {
              color: #4ea8de;
            }
          }
          .completed {
            display: flex;
            align-items: center;
            gap: 1rem;
            .completed-title {
              color: #8284fa;
            }
          }
        }
        .tasks-list {
          margin-top: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
      }
    }
  }
  @media only screen and (max-width: 425px) {
    .add__task {
      max-width: 90%;
      gap: 1rem;
      button {
        span {
          display: none;
        }
      }
    }
    .tasks {
      max-width: 90%;
    }
  }
`;

export const CountBox = styled.span`
  background-color: #333333;
  color: white;
  font-size: 0.7em;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
`;

export const Task = styled.div`
  width: 100%;
  height: 4.5rem;
  background-color: #262626;
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  gap: 1rem;
  overflow: hidden;
  input {
    width: 1.3em;
    height: 1.3em;
    background-color: none;
  }
  img {
    cursor: pointer;
    width: 2rem;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    max-width: 60%;
    span {
      color: white;
      font-weight: bold;
      font-size: 1em;
      transition: 0.3s;
      white-space: nowrap;
      text-transform: capitalize;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      &:not(:first-child) {
        color: #808080;
        font-weight: 400;
      }
    }
  }
  &.completed__task {
    span {
      text-decoration-line: line-through;
      color: #808080;
    }
  }
  @keyframes animeTask {
    from {
      transform: translateY(-2rem);
      opacity: 0;
    }
    to {
      transform: initial;
      opacity: 1;
    }
  }
  animation: animeTask 0.3s ease-out;
`;
