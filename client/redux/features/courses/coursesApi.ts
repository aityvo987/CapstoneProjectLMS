import { apiSlice } from "@/redux/features/api/apiSlice";


export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "get-admin-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/edit-course/${id}`,
                method: "UPDATE",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllUsersCourses: builder.query({
            query: () => ({
                url: `/get-courses/`,
                method: "GET",
            }),
        }),
        getUserCourseDetail: builder.query({
            query: ({ id }) => ({
                url: `/get-course/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getUserCourseContent: builder.query({
            query: ({ id }) => ({
                url: `/get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        addNewQuestion: builder.mutation({
            query: ({question, courseId, contentId}) => ({
                url: "add-question",
                method: "POST",
                body: {question, courseId, contentId},
                credentials: "include" as const,
            }),
        }),
        addNewAnswer: builder.mutation({
            query: ({answer, courseId, contentId,questionId}) => ({
                url: "add-answer",
                method: "POST",
                body: {answer, courseId, contentId,questionId},
                credentials: "include" as const,
            }),
        }),
    })
})

export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useDeleteCourseMutation,
    useEditCourseMutation,
    useGetAllUsersCoursesQuery,
    useGetUserCourseDetailQuery,
    useGetUserCourseContentQuery,
    useAddNewQuestionMutation,
    useAddNewAnswerMutation,
} = courseApi;